using MiniHackthonSEF.Api.DTOs;
using MiniHackthonSEF.Api.Models;

namespace MiniHackthonSEF.Api.Services;

public interface IItemService
{
    Task<IReadOnlyList<ItemReportResponse>> GetAllAsync(string? search, ItemType? type, bool? resolved, CancellationToken cancellationToken);
    Task<ItemReportResponse?> GetByIdAsync(int id, CancellationToken cancellationToken);
    Task<ItemReportResponse> CreateAsync(ItemReportRequest request, CancellationToken cancellationToken);
    Task<ItemReportResponse?> UpdateAsync(int id, ItemReportRequest request, CancellationToken cancellationToken);
    Task<ItemReportResponse?> ResolveAsync(int id, CancellationToken cancellationToken);
    Task<bool> DeleteAsync(int id, CancellationToken cancellationToken);
}
