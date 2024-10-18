namespace Authentication.Kit.Service.Exceptions
{
    public class EntityNotFoundException : BaseException
    {
        public EntityNotFoundException() : base()
        {
        }

        public EntityNotFoundException(string message) : base(message)
        {
        }
    }
}
