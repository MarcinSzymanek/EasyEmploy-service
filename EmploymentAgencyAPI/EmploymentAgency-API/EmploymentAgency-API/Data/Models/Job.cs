namespace EmploymentAgency_API.Data.Models;

public class Job
{
    public int Id { get; set; }
    public string CompanyName { get; set; }
    public string Location { get; set; }
    public string Description { get; set; } = "";
    public DateTime StartDate { get; set; }
    public int DurationDays { get; set; }
    public int HourlySalary { get; set; }
}