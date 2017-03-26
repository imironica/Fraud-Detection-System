using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using FraudDetection.Models;
using FraudDetection.Service;
using System.Linq;
using System.Web.Http;

namespace FraudDetection.Web.Controllers
{
    [Route("api/[controller]")]
    public class TransactionsController : Controller
    {
        private IFraudDetectionService _fraudService;
        public TransactionsController()
        {
            _fraudService = new FraudDetectionService();
        }


        [HttpPost("[action]")]
        public TransactionClientResponse GetTransactionDetails([FromBody] TransactionQuery transactionRequest)
        {
            if (transactionRequest != null && !string.IsNullOrEmpty(transactionRequest.SmsCode)
                && !string.IsNullOrEmpty(transactionRequest.Code))
            {
                var transaction = _fraudService.GetTransaction(transactionRequest.Code, transactionRequest.SmsCode);
                if(transaction == null)
                    return new TransactionClientResponse() { TransactionStatus = "INVALID", Message = "Invalid request credentials!" };
                return transaction;
            }

            return new TransactionClientResponse() { TransactionStatus = "INVALID", Message="Invalid request credentials!" };
        }

        [HttpPost("[action]")]
        public bool SaveTransactionStatus([FromBody] TransactionDTO transactionRequest)
        {
            var transactionChange = _fraudService.SaveTransactionStatus(transactionRequest.TransactionId, transactionRequest.Class);
            return transactionChange;
        }

    }

    public class TransactionQuery
    {
        public string Code { get; set; }
        public string SmsCode { get; set; }
    }
}
