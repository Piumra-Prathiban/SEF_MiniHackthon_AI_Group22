namespace MiniHackthonSEF.Api.Services;

public interface ISupabaseStorageService
{
    Task<string> UploadImageAsync(IFormFile file, CancellationToken cancellationToken);
}
