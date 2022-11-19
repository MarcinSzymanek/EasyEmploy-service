using EmploymentAgency_API.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace EmploymentAgency_API.Data.Contexts;

public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Job>().HasData(
            new Job
            {
                Id = 1,
                CompanyName = "Trifork",
                Description = "Skilled full stack developer needed! Looking for someone who knows how to make an API, a frontend client and containerize it, ASAP!",
                HourlySalary = 250,
                Location = "Aarhus",
                DurationDays = 60,
                StartDate = new DateTime(2023,2,1)
            });
    }

    public DbSet<Job> Jobs { get; set; }
}