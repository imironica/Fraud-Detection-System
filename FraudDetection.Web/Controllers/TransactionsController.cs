using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using FraudDetection.Models;
using FraudDetection.Service;
using System.Linq;
using System.Web.Http;
using System.Threading.Tasks;

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

        [HttpGet("[action]")]
        public IEnumerable<TransactionDTO> GetAlerts()
        {
            var lstTransactions = _fraudService.GetAlerts();
            return lstTransactions;
        }

        [HttpPost("[action]")]
        public TransactionDTO GetAlert([FromBody] TransactionDTO transactionRequest)
        {
            var transaction = _fraudService.GetAlert(transactionRequest.TransactionId);
            return transaction;
        }

        [HttpPost("[action]")]
        public bool SaveTransactionStatus([FromBody] TransactionDTO transactionRequest)
        {
            var transactionChange = _fraudService.SaveTransactionStatus(transactionRequest.TransactionId, transactionRequest.Class);
            return transactionChange;
        }
        

        [HttpPost("[action]")]
        public TransactionAlertReponse VerifyAlert([FromBody]TransactionDTO transaction)
        {
            var response =   _fraudService.VerifyAlert(transaction);
            return response;
        }
        [HttpGet("[action]")]
        public DailyStatisticsDTO GetDailyStatistics()
        {
            var response = _fraudService.GetDailyStatistics();
            return response;
        }
        [HttpGet("[action]")]
        public MonthStatisticDTO GetDashboardStatisticsPerCurrentMonth()
        {
            var response = _fraudService.GetDashboardStatisticsPerCurrentMonth();
            return response;
        }
    }
}
