namespace MiniHackthonSEF.Api.Models;

public sealed class ItemReport
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public ItemType Type { get; set; }
    public required string Location { get; set; }
    public DateOnly Date { get; set; }
    public required string ContactInfo { get; set; }
    public string? ImageUrl { get; set; }
    public bool IsResolved { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
