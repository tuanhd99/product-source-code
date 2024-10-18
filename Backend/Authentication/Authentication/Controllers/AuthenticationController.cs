using Authentication.Data;
using Authentication.Dtos;
using Authentication.Kit.Service.APIResponse;
using Authentication.Kit.Service.Exceptions;
using Authentication.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Authentication.Controllers
{

    [Route("api/[controller]")]
    public class AuthenticationController : APIBaseController
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
        public async Task<string> Register([FromBody] UserRegisterDto requestDto)
        {
            if (!ModelState.IsValid)
            {
                throw new EntityNotFoundException("Invalid request data");
            }
            var user_exist = await _userManager.FindByEmailAsync(requestDto.Email);
            if (user_exist != null)
            {
                throw new EntityNotFoundException("Email already exists");
            }

            var new_user = new IdentityUser
            {
                Email = requestDto.Email,
                UserName = requestDto.Email
            };
            string tokenresponse = string.Empty;

            var is_created = await _userManager.CreateAsync(new_user, requestDto.Password);
            if (is_created.Succeeded)
            {
                tokenresponse = GenerateJwtToken(new_user);
            }
            else
            {
                throw new EntityNotFoundException("User registration failed");
            }
            return tokenresponse;
        }


        [HttpPost("login")]

        public async Task<string> Login([FromBody] UserLoginDto userLoginDto)
        {
            if (!ModelState.IsValid)
            {
                throw new EntityNotFoundException("Invalid request data");
            }
            // check user exist
            var user_exist = await _userManager.FindByEmailAsync(userLoginDto.Email);
            if (user_exist == null)
            {
                throw new EntityNotFoundException("Can not found user account");
            }
            var isCorrect = await _userManager.CheckPasswordAsync(user_exist, userLoginDto.Password);
            if (!isCorrect)
            {
                throw new EntityNotFoundException("Invalid password or email");
            }
            var jwtToken = GenerateJwtToken(user_exist);
            return jwtToken;
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
