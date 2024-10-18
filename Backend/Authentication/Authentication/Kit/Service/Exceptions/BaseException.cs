namespace Authentication.Kit.Service.Exceptions
{
    public abstract class BaseException : Exception
    {
        public virtual int EventCode { get; set; }
        public Guid CorrelatedId { get; set; }
        public virtual string Workaround { get; set; } = string.Empty;

        protected BaseException() : base()
        {
            CorrelatedId = Guid.NewGuid();
        }

        protected BaseException(int eventCode) : base()
        {
            CorrelatedId = Guid.NewGuid();
            EventCode = eventCode;
        }

        protected BaseException(string message) : base(message)
        {
            CorrelatedId = Guid.NewGuid();
        }

        protected BaseException(int eventCode, string message) : base(message)
        {
            CorrelatedId = Guid.NewGuid();
            EventCode = eventCode;
        }

        protected BaseException(string message, Exception inner) : base(message, inner)
        {
            CorrelatedId = Guid.NewGuid();
        }

        protected BaseException(int eventCode, string message, Exception inner) : base(message, inner)
        {
            CorrelatedId = Guid.NewGuid();
            EventCode = eventCode;
        }
    }
}
