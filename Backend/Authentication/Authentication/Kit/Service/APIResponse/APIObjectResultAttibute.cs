using Authentication.Kit.Domain.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Authentication.Kit.Service.APIResponse
{
    [AttributeUsage(AttributeTargets.All, AllowMultiple = false)]
    public class APIObjectResultAttibute : ActionFilterAttribute
    {
        public override void OnResultExecuting(ResultExecutingContext context)
        {
            if (context.Result is ObjectResult)
            {
                if (context.Result is OkObjectResult)
                {
                    context.Result = new ObjectResult(new APIResponseDto<object>
                    {
                        Code = StatusCodes.Status200OK,
                        Data = (context.Result as Object)
                    });
                }
                else if (context.Result is BadRequestObjectResult)
                {
                    context.Result = new ObjectResult(new APIResponseDto<object>
                    {
                        Code = StatusCodes.Status400BadRequest,
                    });
                }
                else if (context.Result is UnauthorizedObjectResult)
                {
                    context.Result = new ObjectResult(new APIResponseDto
                    {
                        Code = StatusCodes.Status401Unauthorized,
                    });
                }
                else if (context.Result is NotFoundObjectResult || context.Result is NotFoundResult)
                {
                    context.Result = new ObjectResult(new APIResponseDto
                    {
                        Code = StatusCodes.Status404NotFound,
                    });
                }
                else
                {
                    var objR = context.Result as ObjectResult;
                    context.Result = new ObjectResult(new APIResponseDto<object>
                    {
                        Code = objR.StatusCode.HasValue ? objR.StatusCode.Value : StatusCodes.Status200OK,
                        Data = objR.Value
                    });
                }
            }
            else if (context.Result is EmptyResult)
            {
                context.Result = new ObjectResult(new APIResponseDto
                {
                    Code = StatusCodes.Status404NotFound,
                });
            }
            else if (context.Result is ContentResult)
            {
                context.Result = new ObjectResult(new APIResponseDto<object>
                {
                    Code = StatusCodes.Status200OK,
                    Data = (context.Result as ContentResult).Content
                });
            }
            else if (context.Result is StatusCodeResult)
            {
                context.Result = new ObjectResult(new APIResponseDto
                {
                    Code = (context.Result as StatusCodeResult).StatusCode,
                });
            }
            else
            {
                var resultObj = context.Result as ObjectResult;
                context.Result = new ObjectResult(new APIResponseDto<object>
                {
                    Code = resultObj.StatusCode.HasValue ? resultObj.StatusCode.Value : StatusCodes.Status200OK,
                    Data = resultObj.Value
                });
            }

        }
    }
}
