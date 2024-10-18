using Authentication.Kit.Domain.Model;
using Authentication.Kit.Service.Exceptions;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace Authentication.Kit.Service.APIResponse
{
    [AttributeUsage(AttributeTargets.All, AllowMultiple = false)]
    public class APIResultExceptionAttribute : ExceptionFilterAttribute
    {

        public override void OnException(ExceptionContext context)
        {
            base.OnException(context);

            if (context.Exception is UnauthorizedAccessException)
            {
                context.Result = new ObjectResult(
                    new
                    {
                        Code = StatusCodes.Status401Unauthorized
                    });
            }
            else if (context.Exception is EntityNotFoundException)
            {
                context.Result = new ObjectResult(
                    new
                    {
                        Code = StatusCodes.Status200OK,
                        Status = SubStatus.ENTITY_NOT_FOUND,
                        Message = context.Exception.Message
                    });
            }
            else
            {
                context.Result = new ObjectResult(
                    new
                    {
                        Code = StatusCodes.Status200OK,
                        Status = SubStatus.RequestError,
                        Message = context.Exception.Message
                    });
            }
        }
    }
}
