using System.ComponentModel.DataAnnotations;
using MiniHackthonSEF.Api.Models;

namespace MiniHackthonSEF.Api.DTOs;

public sealed class ItemReportRequest : IValidatableObject
{
    [Required, StringLength(100, MinimumLength = 2)]
    public string Name { get; set; } = string.Empty;

    [Required, StringLength(1000, MinimumLength = 5)]
    public string Description { get; set; } = string.Empty;

    [Required]
    public ItemType? Type { get; set; }

    [Required, StringLength(150, MinimumLength = 2)]
    public string Location { get; set; } = string.Empty;

    [Required]
    public DateOnly? Date { get; set; }

    [Required, StringLength(200, MinimumLength = 3)]
    public string ContactInfo { get; set; } = string.Empty;

    [StringLength(2048)]
    public string? ImageUrl { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if ((Name ?? string.Empty).Trim().Length is < 2 or > 100)
            yield return new ValidationResult("Name must be between 2 and 100 characters after trimming.", [nameof(Name)]);
        if ((Description ?? string.Empty).Trim().Length is < 5 or > 1000)
            yield return new ValidationResult("Description must be between 5 and 1000 characters after trimming.", [nameof(Description)]);
        if ((Location ?? string.Empty).Trim().Length is < 2 or > 150)
            yield return new ValidationResult("Location must be between 2 and 150 characters after trimming.", [nameof(Location)]);
        if ((ContactInfo ?? string.Empty).Trim().Length is < 3 or > 200)
            yield return new ValidationResult("Contact information must be between 3 and 200 characters after trimming.", [nameof(ContactInfo)]);

        if (Date is not null && Date > DateOnly.FromDateTime(DateTime.UtcNow))
        {
            yield return new ValidationResult("The item date cannot be in the future.", [nameof(Date)]);
        }

        if (!string.IsNullOrWhiteSpace(ImageUrl) &&
            (!Uri.TryCreate(ImageUrl.Trim(), UriKind.Absolute, out var uri) ||
             (uri.Scheme != Uri.UriSchemeHttp && uri.Scheme != Uri.UriSchemeHttps)))
        {
            yield return new ValidationResult("Image URL must be an absolute HTTP or HTTPS URL.", [nameof(ImageUrl)]);
        }
    }
}
