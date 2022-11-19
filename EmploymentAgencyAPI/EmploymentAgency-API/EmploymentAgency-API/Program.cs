using System.Text.Json.Serialization;
using EmploymentAgency_API.Data.Contexts;
using EmploymentAgency_API.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Scaffolding.Metadata;



    var builder = WebApplication.CreateBuilder(args);

    // Add services to the container.

    // Fixes "A possible object cycle was detected"
    builder.Services.AddControllers().AddJsonOptions(
    x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles
    ) ;

    builder.Services.AddCors(options =>
    {
        options.AddPolicy(name: "AllowAll",
        policy  =>
        {
            policy.WithOrigins()
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
    });


    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    // Allows dependency injection of DbContext. Configures to use InMemory db
    builder.Services.AddDbContext<DatabaseContext>(options =>
    options.UseInMemoryDatabase("EmploymentAgencyDatabase-01"));

    var app = builder.Build();

    // Configure the HTTP request pipeline. Swagger helps with testing before frontend is done.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();

    app.UseAuthorization();

    app.MapControllers();

    {
        var scope = app.Services.CreateScope();
        var db = scope.ServiceProvider.GetService<DatabaseContext>();
        var data = new Job(){
            Id = 1,
            CompanyName = "Trifork",
            Description = "Skilled full stack developer needed! Looking for someone who knows how to make an API, a frontend client and containerize it, ASAP!",
            HourlySalary = 250,
            Location = "Aarhus",
            DurationDays = 60,
            StartDate = new DateTime(2023,2,1)
        };
        db.Add(data);
        db.SaveChanges();
    }

    app.UseCors("AllowAll");
    app.Run();

