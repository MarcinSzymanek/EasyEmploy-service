using System.Data;
using EmploymentAgency_API.Data.Contexts;
using EmploymentAgency_API.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmploymentAgency_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobController : ControllerBase
    {
        private readonly ILogger<JobController> _logger;
        private readonly DatabaseContext _context;

        public JobController(ILogger<JobController> logger, DatabaseContext context)
        {
            _logger = logger;
            _context = context;
        }
        
        /// <summary>
        /// Looks for the job with specified id in the db. 
        /// </summary>
        /// <returns>If found, job with the specified id. Otherwise, BadRequest</returns>
        [HttpGet("")]
        public async Task<ActionResult<Job>> GetJobs()
        {
            var jobs = await _context.Jobs.ToListAsync();
            if (jobs != null)
            {
                _logger.Log(LogLevel.Information, "Get request processed");
                return Ok(jobs);
            }
            return NotFound("No jobs found in the database");
        }

        /// <summary>
        /// Looks for the job with specified id in the db. 
        /// </summary>
        /// <returns>If found, job with the specified id. Otherwise, BadRequest</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Job>> Get(int id)
        {
            var job = await _context.Jobs.FirstOrDefaultAsync(j => j.Id == id);
            if (job != null)
            {
                _logger.Log(LogLevel.Information, "Get request processed");
                return Ok(job);
            }
            return NotFound("Job id not found in database");
        }

        /// <summary>
        /// Inserts a new Job provided by request into the database
        /// </summary>
        /// <returns> On success: Status 202 and the id of the job created</returns>
        [HttpPost]
        public async Task<ActionResult<int>> Post(Job job)
        {
            try
            {
                _context.Jobs.Add(job);
                await _context.SaveChangesAsync();
                _logger.Log(LogLevel.Information, "New job with Id: " + job.Id + " inserted");
                return Accepted(job.Id);
            }
            catch (DBConcurrencyException ex)
            {
                _logger.Log(LogLevel.Error, "Concurrency error at row: " + ex.Row);
                return Conflict(ex.Message);
            }
        }
    }
}