using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MiniHackthonSEF.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ItemReports",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    Type = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    Location = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    Date = table.Column<DateOnly>(type: "date", nullable: false),
                    ContactInfo = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    ImageUrl = table.Column<string>(type: "character varying(2048)", maxLength: 2048, nullable: true),
                    IsResolved = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemReports", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "ItemReports",
                columns: new[] { "Id", "ContactInfo", "CreatedAt", "Date", "Description", "ImageUrl", "IsResolved", "Location", "Name", "Type", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, "nimal@campus.lk", new DateTime(2026, 9, 3, 8, 30, 0, 0, DateTimeKind.Utc), new DateOnly(2026, 9, 2), "Small black wallet with a university ID and bank cards inside.", null, false, "Main Library, Ground Floor", "Black leather wallet", "Lost", new DateTime(2026, 9, 3, 8, 30, 0, 0, DateTimeKind.Utc) },
                    { 2, "077 456 9821", new DateTime(2026, 9, 3, 12, 15, 0, 0, DateTimeKind.Utc), new DateOnly(2026, 9, 3), "Metal water bottle with a white mountain sticker on the side.", null, false, "Faculty of Computing Lab 2", "Blue water bottle", "Found", new DateTime(2026, 9, 3, 12, 15, 0, 0, DateTimeKind.Utc) },
                    { 3, "security@campus.lk", new DateTime(2026, 9, 2, 7, 40, 0, 0, DateTimeKind.Utc), new DateOnly(2026, 9, 1), "Student ID belonging to K. Perera, found near the cafeteria entrance.", null, true, "University Cafeteria", "Student ID card", "Found", new DateTime(2026, 9, 2, 7, 40, 0, 0, DateTimeKind.Utc) },
                    { 4, "071 234 8810", new DateTime(2026, 8, 31, 10, 10, 0, 0, DateTimeKind.Utc), new DateOnly(2026, 8, 30), "Grey Casio fx-991ES calculator in a transparent cover.", null, false, "Engineering Lecture Hall B", "Casio scientific calculator", "Lost", new DateTime(2026, 8, 31, 10, 10, 0, 0, DateTimeKind.Utc) },
                    { 5, "student.affairs@campus.lk", new DateTime(2026, 8, 30, 6, 15, 0, 0, DateTimeKind.Utc), new DateOnly(2026, 8, 29), "Compact red umbrella found after the afternoon lecture.", null, false, "Arts Building, Room 204", "Red umbrella", "Found", new DateTime(2026, 8, 30, 6, 15, 0, 0, DateTimeKind.Utc) },
                    { 6, "076 555 1274", new DateTime(2026, 8, 29, 13, 25, 0, 0, DateTimeKind.Utc), new DateOnly(2026, 8, 28), "Black 32GB USB drive with a small green keyring.", null, true, "IT Centre", "USB flash drive", "Lost", new DateTime(2026, 8, 29, 13, 25, 0, 0, DateTimeKind.Utc) }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ItemReports_CreatedAt",
                table: "ItemReports",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_ItemReports_Type_IsResolved",
                table: "ItemReports",
                columns: new[] { "Type", "IsResolved" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ItemReports");
        }
    }
}
