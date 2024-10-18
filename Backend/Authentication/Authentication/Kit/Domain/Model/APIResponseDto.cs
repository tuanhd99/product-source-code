namespace Authentication.Kit.Domain.Model
{
    public class APIResponseDto
    {
        public int Code { get; set; }
        public int StatusCode { get; set; }
    }

    public class APIResponseDto<T> : APIResponseDto
    {
        public T Data { get; set; } 
    }
    public enum SubStatus
    {
        Successed = 0,
        RequestError = 1000,
        SAMENAME_ERROR = 40001,
        ENTITY_NOT_FOUND = 40004,
        USER_NOT_FOUND = 40005,
        INTERNAL_SERVER_ERROR = 50000,
        CIRCULATION_REQUEST = 50001,
        CIRCULATION_NOMATCH = 50008,
        ParameterNullException = 50002,
        SiteCreationException = 50003,
        HIPException = 50004,
        EOpsResponseException = 50005,
        BOARD_REQUEST = 50006,
        DocumentNotExistException = 50007,
        PERMISSION = 70000,
        INDIVIDUALROLESAMETIMEPERIOD = 70003,
        TIMECOMPARISON = 70004,
        STATUS_CONFLICT = 80000,
        DOCUMENT_TYPE_ERROR = 80001,
        RESOURCE_NOT_EXIST = 90000,
        WORKFLOWSETUPEXCEPTION = 90001,
        ADBEMAILNOTEMPLATEEXCEPTION = 90002,
        ADBEMAILNORECIPIENTEXCEPTION = 90003,
        PackageOngoingException = 90004,
        ValueNotFoundInKeyVault = 40401,
        RefineQueryExceedLimit = -2146233086,
    }
}
