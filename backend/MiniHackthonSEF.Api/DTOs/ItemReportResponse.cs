using MiniHackthonSEF.Api.Models;

namespace MiniHackthonSEF.Api.DTOs;

public sealed record ItemReportResponse(
    int Id,
    string Name,
    string Description,
    ItemType Type,
    string Location,
    DateOnly Date,
    string ContactInfo,
    string? ImageUrl,
    bool IsResolved,
    DateTime CreatedAt,
    DateTime UpdatedAt);
