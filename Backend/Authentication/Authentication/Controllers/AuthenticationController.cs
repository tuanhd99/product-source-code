using Authentication.Data;
using Authentication.Dtos;
using Authentication.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Authentication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private AppDbContext _context { get; set; }
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _configuration;
        public AuthenticationController(AppDbContext context, UserManager<IdentityUser> userManager, IConfiguration configuration)
        {
            _context = context;
            _userManager = userManager;
            _configuration = configuration;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto requestDto)
        {
            if (ModelState.IsValid)
            {
                var user_exist = await _userManager.FindByEmailAsync(requestDto.Email);
                if (user_exist != null)
                {
                    return BadRequest(new AuthResult()
                    {
                        Errors = new List<string>() { "Email already exist" },
                        Result = false
                    });
                }
                // Create a user

                var new_user = new IdentityUser()
                {
                    Email = requestDto.Email,
                    UserName = requestDto.Email
                };
               var is_created = await _userManager.CreateAsync(new_user,requestDto.Password);
                if (is_created.Succeeded)
                {
                    //Create token
                    var token = GenerateJwtToken(new_user);
                    return Ok(new AuthResult()
                    {
                        Result = true,
                        Token = token,
                        Message = "Successfully logged in"
                    });        
                }
                return BadRequest(new AuthResult()
                {
                    Errors = new List<string>() {
                        "Server error"
                    },
                    Result = false

                });
            }
            return BadRequest();
        }

        [HttpPost("login")]

        public async Task<IActionResult> Login([FromBody] UserLoginDto userLoginDto)
        {
            if (ModelState.IsValid)
            {
                // check user exist
                var user_exist = await _userManager.FindByEmailAsync(userLoginDto.Email);
                if (user_exist == null)
                {
                    return BadRequest(new AuthResult()
                    {
                        Errors = new List<string>() { "Invalid payload" },
                        Result = false,
                        Message = "An occurred login account"
                    });
                }
                var isCorrect = await _userManager.CheckPasswordAsync(user_exist, userLoginDto.Password);
                if (!isCorrect)
                {
                    return BadRequest(new AuthResult()
                    {
                        Errors = new List<string>() { "Invalid credent" },
                        Result = false,
                        Message = "An occurred login account"
                    });
                }
                var jwtToken = GenerateJwtToken(user_exist);
                return Ok(new AuthResult()
                {
                    Result = true,
                    Token = jwtToken
                });
            }
            return BadRequest();
        }
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            return Ok(new AuthResult { Result = true, Message = "Successfully logged out" });
        }
      
        private string GenerateJwtToken(IdentityUser user)
        {
            var jwtTolenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration.GetSection("JwtConfig:Sercet").Value);
            // Token descriptor
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("Id", user.Id),
                    new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim (JwtRegisteredClaimNames.Iat, DateTime.Now.ToUniversalTime().ToString())
                }),
                Expires = DateTime.Now.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };
            var token = jwtTolenHandler.CreateToken(tokenDescriptor);
            return jwtTolenHandler.WriteToken(token);
             ;
        }
    
    }
}
