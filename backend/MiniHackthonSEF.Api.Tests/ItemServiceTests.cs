using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using MiniHackthonSEF.Api.Data;
using MiniHackthonSEF.Api.DTOs;
using MiniHackthonSEF.Api.Models;
using MiniHackthonSEF.Api.Services;

namespace MiniHackthonSEF.Api.Tests;

public sealed class ItemServiceTests
{
    [Fact]
    public async Task GetAll_combines_type_and_resolved_filters()
    {
        await using var db = CreateDatabase();
        var service = new ItemService(db);

        var results = await service.GetAllAsync(null, ItemType.Found, false, default);

        Assert.NotEmpty(results);
        Assert.All(results, item => { Assert.Equal(ItemType.Found, item.Type); Assert.False(item.IsResolved); });
        Assert.True(results.SequenceEqual(results.OrderByDescending(x => x.CreatedAt)));
    }

    [Fact]
    public async Task Create_trims_values_and_manages_server_fields()
    {
        await using var db = CreateDatabase();
        var service = new ItemService(db);
        var request = ValidRequest();
        request.Name = "  Green notebook  ";
        request.ImageUrl = "   ";

        var result = await service.CreateAsync(request, default);

        Assert.Equal("Green notebook", result.Name);
        Assert.Null(result.ImageUrl);
        Assert.False(result.IsResolved);
        Assert.True(result.Id > 0);
        Assert.Equal(DateTimeKind.Utc, result.CreatedAt.Kind);
    }

    [Fact]
    public async Task Resolve_is_idempotent_and_missing_items_return_null()
    {
        await using var db = CreateDatabase();
        var service = new ItemService(db);

        var first = await service.ResolveAsync(1, default);
        var second = await service.ResolveAsync(1, default);

        Assert.True(first!.IsResolved);
        Assert.Equal(first.UpdatedAt, second!.UpdatedAt);
        Assert.Null(await service.ResolveAsync(9999, default));
    }

    [Fact]
    public void Request_rejects_future_date_and_non_http_image_url()
    {
        var request = ValidRequest();
        request.Date = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(1));
        request.ImageUrl = "ftp://example.com/item.jpg";
        var results = new List<ValidationResult>();

        var valid = Validator.TryValidateObject(request, new ValidationContext(request), results, true);

        Assert.False(valid);
        Assert.Contains(results, x => x.MemberNames.Contains(nameof(ItemReportRequest.Date)));
        Assert.Contains(results, x => x.MemberNames.Contains(nameof(ItemReportRequest.ImageUrl)));
    }

    private static AppDbContext CreateDatabase()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;
        var db = new AppDbContext(options);
        db.Database.EnsureCreated();
        return db;
    }

    private static ItemReportRequest ValidRequest() => new()
    {
        Name = "Green notebook", Description = "A ruled A5 notebook.", Type = ItemType.Lost,
        Location = "Science Block", Date = DateOnly.FromDateTime(DateTime.UtcNow), ContactInfo = "student@campus.lk"
    };
}
