using Authentication.Data;
using Authentication.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Authentication.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TeamsController : ControllerBase
    {

        private AppDbContext _context;
        public TeamsController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet("getlist")]
        public async Task<ActionResult> Get()
        {
            var teams = await _context.Teams.ToListAsync();
            return Ok(teams);
        }
        [HttpGet("id")]
        public async Task<ActionResult> GetById(Guid Id)
        {
            var team = await _context.Teams.FirstOrDefaultAsync(x => x.Id == Id);
            if (team == null)
            {
                return BadRequest("Invalid Id");
            }
            return Ok(team);
        }
        [HttpPost("create")]
        public async Task<ActionResult> Create(Team team)
        {
            team.Id = Guid.NewGuid();
            await _context.Teams.AddAsync(team);
            await _context.SaveChangesAsync();
            return Ok(true);
        }
        //[HttpDelete("delete")]
        //public IActionResult Delete (Guid Id)
        //{
        //    var team = teams.FirstOrDefault(x => x.Id == Id);
        //    if(team == null)
        //    {
        //        return BadRequest("Invalid Id");
        //    }
        //    teams.Remove(team);
        //    return NoContent();
        //}


    }
}
