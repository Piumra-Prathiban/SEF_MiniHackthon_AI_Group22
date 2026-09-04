using Microsoft.EntityFrameworkCore;
using MiniHackthonSEF.Api.Models;

namespace MiniHackthonSEF.Api.Data;

public sealed class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<ItemReport> ItemReports => Set<ItemReport>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var item = modelBuilder.Entity<ItemReport>();
        item.ToTable("ItemReports");
        item.HasKey(x => x.Id);
        item.Property(x => x.Name).HasMaxLength(100).IsRequired();
        item.Property(x => x.Description).HasMaxLength(1000).IsRequired();
        item.Property(x => x.Type).HasConversion<string>().HasMaxLength(10).IsRequired();
        item.Property(x => x.Location).HasMaxLength(150).IsRequired();
        item.Property(x => x.ContactInfo).HasMaxLength(200).IsRequired();
        item.Property(x => x.ImageUrl).HasMaxLength(2048);
        item.Property(x => x.CreatedAt).HasColumnType("timestamp with time zone");
        item.Property(x => x.UpdatedAt).HasColumnType("timestamp with time zone");
        item.HasIndex(x => x.CreatedAt);
        item.HasIndex(x => new { x.Type, x.IsResolved });

        item.HasData(
            Seed(1, "Black leather wallet", "Small black wallet with a university ID and bank cards inside.", ItemType.Lost, "Main Library, Ground Floor", new(2026, 9, 2), "nimal@campus.lk", false, new(2026, 9, 3, 8, 30, 0, DateTimeKind.Utc)),
            Seed(2, "Blue water bottle", "Metal water bottle with a white mountain sticker on the side.", ItemType.Found, "Faculty of Computing Lab 2", new(2026, 9, 3), "077 456 9821", false, new(2026, 9, 3, 12, 15, 0, DateTimeKind.Utc)),
            Seed(3, "Student ID card", "Student ID belonging to K. Perera, found near the cafeteria entrance.", ItemType.Found, "University Cafeteria", new(2026, 9, 1), "security@campus.lk", true, new(2026, 9, 2, 7, 40, 0, DateTimeKind.Utc)),
            Seed(4, "Casio scientific calculator", "Grey Casio fx-991ES calculator in a transparent cover.", ItemType.Lost, "Engineering Lecture Hall B", new(2026, 8, 30), "071 234 8810", false, new(2026, 8, 31, 10, 10, 0, DateTimeKind.Utc)),
            Seed(5, "Red umbrella", "Compact red umbrella found after the afternoon lecture.", ItemType.Found, "Arts Building, Room 204", new(2026, 8, 29), "student.affairs@campus.lk", false, new(2026, 8, 30, 6, 15, 0, DateTimeKind.Utc)),
            Seed(6, "USB flash drive", "Black 32GB USB drive with a small green keyring.", ItemType.Lost, "IT Centre", new(2026, 8, 28), "076 555 1274", true, new(2026, 8, 29, 13, 25, 0, DateTimeKind.Utc)));
    }

    private static ItemReport Seed(int id, string name, string description, ItemType type, string location, DateOnly date, string contact, bool resolved, DateTime created) =>
        new() { Id = id, Name = name, Description = description, Type = type, Location = location, Date = date, ContactInfo = contact, IsResolved = resolved, CreatedAt = created, UpdatedAt = created };
}
