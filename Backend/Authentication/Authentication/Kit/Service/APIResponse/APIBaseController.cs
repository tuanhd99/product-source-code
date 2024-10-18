using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Authentication.Kit.Service.APIResponse
{
    [ApiController]
    [APIObjectResultAttibute]
    [APIResultExceptionAttribute]
    //[Authorize]
    public class APIBaseController : Controller
    {
        private readonly IHttpContextAccessor _contextAccessor;

        protected HttpContext _httpContext
        {
            get { return _contextAccessor.HttpContext; }
        }
        public APIBaseController(IHttpContextAccessor contextAccessor)
        {
            _contextAccessor = contextAccessor;
        }
        public APIBaseController()
        {

        }
    }

}
