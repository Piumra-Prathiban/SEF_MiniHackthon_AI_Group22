using Microsoft.AspNetCore.Mvc;
using MiniHackthonSEF.Api.DTOs;
using MiniHackthonSEF.Api.Models;
using MiniHackthonSEF.Api.Services;

namespace MiniHackthonSEF.Api.Controllers;

[ApiController]
[Route("api/items")]
public sealed class ItemsController(IItemService itemService) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType<IReadOnlyList<ItemReportResponse>>(StatusCodes.Status200OK)]
    [ProducesResponseType<ValidationProblemDetails>(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<IReadOnlyList<ItemReportResponse>>> GetAll([FromQuery] string? search, [FromQuery] string? type, [FromQuery] string? resolved, CancellationToken cancellationToken)
    {
        ItemType? parsedType = null;
        bool? parsedResolved = null;
        ItemType itemType = default;
        bool isResolved = default;
        if (!string.IsNullOrWhiteSpace(type) &&
            (!Enum.TryParse(type, true, out itemType) || !Enum.GetNames<ItemType>().Any(name => name.Equals(type, StringComparison.OrdinalIgnoreCase))))
            ModelState.AddModelError(nameof(type), "Type must be either Lost or Found.");
        else if (!string.IsNullOrWhiteSpace(type)) parsedType = itemType;
        if (!string.IsNullOrWhiteSpace(resolved) && !bool.TryParse(resolved, out isResolved)) ModelState.AddModelError(nameof(resolved), "Resolved must be true or false.");
        else if (!string.IsNullOrWhiteSpace(resolved)) parsedResolved = isResolved;
        if (!ModelState.IsValid) return ValidationProblem(ModelState);
        return Ok(await itemService.GetAllAsync(search, parsedType, parsedResolved, cancellationToken));
    }

    [HttpGet("{id:int}")]
    [ProducesResponseType<ItemReportResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ItemReportResponse>> GetById(int id, CancellationToken cancellationToken)
    {
        var item = await itemService.GetByIdAsync(id, cancellationToken);
        return item is null ? NotFound() : Ok(item);
    }

    [HttpPost]
    [ProducesResponseType<ItemReportResponse>(StatusCodes.Status201Created)]
    [ProducesResponseType<ValidationProblemDetails>(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ItemReportResponse>> Create(ItemReportRequest request, CancellationToken cancellationToken)
    {
        var item = await itemService.CreateAsync(request, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
    }

    [HttpPut("{id:int}")]
    [ProducesResponseType<ItemReportResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ItemReportResponse>> Update(int id, ItemReportRequest request, CancellationToken cancellationToken)
    {
        var item = await itemService.UpdateAsync(id, request, cancellationToken);
        return item is null ? NotFound() : Ok(item);
    }

    [HttpPatch("{id:int}/resolve")]
    [ProducesResponseType<ItemReportResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ItemReportResponse>> Resolve(int id, CancellationToken cancellationToken)
    {
        var item = await itemService.ResolveAsync(id, cancellationToken);
        return item is null ? NotFound() : Ok(item);
    }

    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken) =>
        await itemService.DeleteAsync(id, cancellationToken) ? NoContent() : NotFound();
}
