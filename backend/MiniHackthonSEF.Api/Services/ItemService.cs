using Microsoft.EntityFrameworkCore;
using MiniHackthonSEF.Api.Data;
using MiniHackthonSEF.Api.DTOs;
using MiniHackthonSEF.Api.Models;

namespace MiniHackthonSEF.Api.Services;

public sealed class ItemService(AppDbContext dbContext) : IItemService
{
    public async Task<IReadOnlyList<ItemReportResponse>> GetAllAsync(string? search, ItemType? type, bool? resolved, CancellationToken cancellationToken)
    {
        var query = dbContext.ItemReports.AsNoTracking().AsQueryable();
        if (!string.IsNullOrWhiteSpace(search))
        {
            var pattern = $"%{search.Trim()}%";
            query = query.Where(x => EF.Functions.ILike(x.Name, pattern) || EF.Functions.ILike(x.Description, pattern) || EF.Functions.ILike(x.Location, pattern));
        }
        if (type is not null) query = query.Where(x => x.Type == type);
        if (resolved is not null) query = query.Where(x => x.IsResolved == resolved);

        return await query.OrderByDescending(x => x.CreatedAt).ThenByDescending(x => x.Id)
            .Select(x => new ItemReportResponse(x.Id, x.Name, x.Description, x.Type, x.Location, x.Date, x.ContactInfo, x.ImageUrl, x.IsResolved, x.CreatedAt, x.UpdatedAt))
            .ToListAsync(cancellationToken);
    }

    public async Task<ItemReportResponse?> GetByIdAsync(int id, CancellationToken cancellationToken) =>
        await dbContext.ItemReports.AsNoTracking().Where(x => x.Id == id)
            .Select(x => new ItemReportResponse(x.Id, x.Name, x.Description, x.Type, x.Location, x.Date, x.ContactInfo, x.ImageUrl, x.IsResolved, x.CreatedAt, x.UpdatedAt))
            .SingleOrDefaultAsync(cancellationToken);

    public async Task<ItemReportResponse> CreateAsync(ItemReportRequest request, CancellationToken cancellationToken)
    {
        var now = DateTime.UtcNow;
        var item = new ItemReport { Name = request.Name.Trim(), Description = request.Description.Trim(), Type = request.Type!.Value, Location = request.Location.Trim(), Date = request.Date!.Value, ContactInfo = request.ContactInfo.Trim(), ImageUrl = CleanOptional(request.ImageUrl), IsResolved = false, CreatedAt = now, UpdatedAt = now };
        dbContext.ItemReports.Add(item);
        await dbContext.SaveChangesAsync(cancellationToken);
        return ToResponse(item);
    }

    public async Task<ItemReportResponse?> UpdateAsync(int id, ItemReportRequest request, CancellationToken cancellationToken)
    {
        var item = await dbContext.ItemReports.FindAsync([id], cancellationToken);
        if (item is null) return null;
        item.Name = request.Name.Trim(); item.Description = request.Description.Trim(); item.Type = request.Type!.Value; item.Location = request.Location.Trim(); item.Date = request.Date!.Value; item.ContactInfo = request.ContactInfo.Trim(); item.ImageUrl = CleanOptional(request.ImageUrl); item.UpdatedAt = DateTime.UtcNow;
        await dbContext.SaveChangesAsync(cancellationToken);
        return ToResponse(item);
    }

    public async Task<ItemReportResponse?> ResolveAsync(int id, CancellationToken cancellationToken)
    {
        var item = await dbContext.ItemReports.FindAsync([id], cancellationToken);
        if (item is null) return null;
        if (!item.IsResolved) { item.IsResolved = true; item.UpdatedAt = DateTime.UtcNow; await dbContext.SaveChangesAsync(cancellationToken); }
        return ToResponse(item);
    }

    public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken)
    {
        var item = await dbContext.ItemReports.FindAsync([id], cancellationToken);
        if (item is null) return false;
        dbContext.ItemReports.Remove(item);
        await dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }

    private static string? CleanOptional(string? value) => string.IsNullOrWhiteSpace(value) ? null : value.Trim();
    private static ItemReportResponse ToResponse(ItemReport x) => new(x.Id, x.Name, x.Description, x.Type, x.Location, x.Date, x.ContactInfo, x.ImageUrl, x.IsResolved, x.CreatedAt, x.UpdatedAt);
}
