using Microsoft.AspNetCore.Mvc;
using MiniHackthonSEF.Api.Services;

namespace MiniHackthonSEF.Api.Controllers;

[ApiController]
[Route("api/images")]
public sealed class ImagesController(ISupabaseStorageService storageService) : ControllerBase
{
    private const long MaximumImageSize = 5 * 1024 * 1024;
    private static readonly HashSet<string> AllowedTypes = ["image/jpeg", "image/png", "image/webp"];

    [HttpPost]
    [Consumes("multipart/form-data")]
    [RequestSizeLimit(6 * 1024 * 1024)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType<ValidationProblemDetails>(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<object>> Upload(IFormFile? file, CancellationToken cancellationToken)
    {
        if (file is null || file.Length == 0)
            ModelState.AddModelError(nameof(file), "Select an image to upload.");
        else
        {
            if (file.Length > MaximumImageSize)
                ModelState.AddModelError(nameof(file), "The image must be 5 MB or smaller.");
            if (!AllowedTypes.Contains(file.ContentType.ToLowerInvariant()))
                ModelState.AddModelError(nameof(file), "Only JPEG, PNG, and WebP images are supported.");
            else if (!await HasValidSignatureAsync(file, cancellationToken))
                ModelState.AddModelError(nameof(file), "The selected file does not appear to be a valid image.");
        }

        if (!ModelState.IsValid) return ValidationProblem(ModelState);
        var imageUrl = await storageService.UploadImageAsync(file!, cancellationToken);
        return StatusCode(StatusCodes.Status201Created, new { imageUrl });
    }

    private static async Task<bool> HasValidSignatureAsync(IFormFile file, CancellationToken cancellationToken)
    {
        var header = new byte[12];
        await using var stream = file.OpenReadStream();
        var read = await stream.ReadAsync(header, cancellationToken);
        return file.ContentType.ToLowerInvariant() switch
        {
            "image/jpeg" => read >= 3 && header[0] == 0xFF && header[1] == 0xD8 && header[2] == 0xFF,
            "image/png" => read >= 8 && header[..8].SequenceEqual(new byte[] { 137, 80, 78, 71, 13, 10, 26, 10 }),
            "image/webp" => read >= 12 && header[..4].SequenceEqual("RIFF"u8.ToArray()) && header[8..12].SequenceEqual("WEBP"u8.ToArray()),
            _ => false
        };
    }
}
