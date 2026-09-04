using System.Net.Http.Headers;

namespace MiniHackthonSEF.Api.Services;

public sealed class SupabaseStorageService(
    IHttpClientFactory httpClientFactory,
    IConfiguration configuration,
    ILogger<SupabaseStorageService> logger) : ISupabaseStorageService
{
    public async Task<string> UploadImageAsync(IFormFile file, CancellationToken cancellationToken)
    {
        var baseUrl = configuration["Supabase:Url"]?.TrimEnd('/');
        var secretKey = configuration["Supabase:SecretKey"];
        var bucket = configuration["Supabase:StorageBucket"] ?? "item-images";
        if (string.IsNullOrWhiteSpace(baseUrl) || string.IsNullOrWhiteSpace(secretKey))
            throw new InvalidOperationException("Supabase Storage is not configured.");

        var extension = file.ContentType switch
        {
            "image/jpeg" => ".jpg",
            "image/png" => ".png",
            "image/webp" => ".webp",
            _ => throw new InvalidOperationException("Unsupported image type.")
        };
        var objectName = $"reports/{DateTime.UtcNow:yyyy/MM}/{Guid.NewGuid():N}{extension}";
        var uploadUrl = $"{baseUrl}/storage/v1/object/{bucket}/{objectName}";

        using var request = new HttpRequestMessage(HttpMethod.Post, uploadUrl);
        request.Headers.Add("apikey", secretKey);
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", secretKey);
        request.Headers.Add("x-upsert", "false");
        request.Content = new StreamContent(file.OpenReadStream());
        request.Content.Headers.ContentType = new MediaTypeHeaderValue(file.ContentType);

        var response = await httpClientFactory.CreateClient().SendAsync(request, cancellationToken);
        if (!response.IsSuccessStatusCode)
        {
            logger.LogWarning("Supabase Storage upload failed with status {StatusCode}", response.StatusCode);
            throw new InvalidOperationException("The image could not be uploaded.");
        }

        return $"{baseUrl}/storage/v1/object/public/{bucket}/{objectName}";
    }
}
