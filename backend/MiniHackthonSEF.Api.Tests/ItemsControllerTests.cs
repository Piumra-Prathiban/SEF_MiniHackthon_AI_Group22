using Microsoft.AspNetCore.Mvc;
using MiniHackthonSEF.Api.Controllers;
using MiniHackthonSEF.Api.DTOs;
using MiniHackthonSEF.Api.Models;
using MiniHackthonSEF.Api.Services;

namespace MiniHackthonSEF.Api.Tests;

public sealed class ItemsControllerTests
{
    [Fact]
    public async Task GetAll_rejects_malformed_filters_before_calling_service()
    {
        var service = new RecordingItemService();
        var controller = new ItemsController(service);

        var result = await controller.GetAll(null, "missing", "perhaps", default);

        var response = Assert.IsType<ObjectResult>(result.Result);
        var problem = Assert.IsType<ValidationProblemDetails>(response.Value);
        Assert.Contains("type", problem.Errors.Keys);
        Assert.Contains("resolved", problem.Errors.Keys);
        Assert.False(service.WasCalled);
    }

    private sealed class RecordingItemService : IItemService
    {
        public bool WasCalled { get; private set; }
        public Task<IReadOnlyList<ItemReportResponse>> GetAllAsync(string? search, ItemType? type, bool? resolved, CancellationToken token) { WasCalled = true; return Task.FromResult<IReadOnlyList<ItemReportResponse>>([]); }
        public Task<ItemReportResponse?> GetByIdAsync(int id, CancellationToken token) => throw new NotImplementedException();
        public Task<ItemReportResponse> CreateAsync(ItemReportRequest request, CancellationToken token) => throw new NotImplementedException();
        public Task<ItemReportResponse?> UpdateAsync(int id, ItemReportRequest request, CancellationToken token) => throw new NotImplementedException();
        public Task<ItemReportResponse?> ResolveAsync(int id, CancellationToken token) => throw new NotImplementedException();
        public Task<bool> DeleteAsync(int id, CancellationToken token) => throw new NotImplementedException();
    }
}
