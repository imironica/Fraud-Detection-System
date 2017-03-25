using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using FraudDetection.Models;
using FraudDetection.Service;
using System;
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

        [HttpPost("[action]")]
        public IEnumerable<TransactionDTO> GetAlerts([FromBody]TransactionListRequest query)
        {
            var lstTransactions = _fraudService.GetAlerts(query.TransactionDate);
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
        public Task<TransactionAlertReponse> VerifyAlert([FromBody]TransactionDTO transaction)
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
        public DashboardStatisticsDTO GetDashboardStatistics()
        {
            var response = _fraudService.GetDashboardStatistics();
            return response;
        }

        [HttpGet("[action]")]
        public MonthStatisticDTO GetDashboardStatisticsPerCurrentMonth()
        {
            var response = _fraudService.GetDashboardStatisticsPerCurrentMonth();
            return response;
        }

        [HttpGet("[action]")]
        public List<DailyStatisticsPerLastMonthDTO> GetDashboardDailyStatisticsPerLastMonth()
        {
            var response = _fraudService.GetDashboardDailyStatisticsPerLastMonth();
            return response;
        }

        [HttpGet("[action]")]
        public List<StatisticsPerCountryDTO> GetDashboardStatisticsPerCountryPerCurrentMonth()
        {
            var response = _fraudService.GetDashboardStatisticsPerCountryPerCurrentMonth();
            return response;
        }

        [HttpGet("[action]")]
        public List<StatisticsPerClientCountryDTO> GetDashboardStatisticsPerClientCountryPerCurrentMonth()
        {
            var response = _fraudService.GetDashboardStatisticsPerClientCountryPerCurrentMonth();
            return response;
        }

        [HttpGet("[action]")]
        public List<StatisticsPerCardVendorDTO> GetDashboardStatisticsPerCardVendorPerCurrentMonth()
        {
            var response = _fraudService.GetDashboardStatisticsPerCardVendorPerCurrentMonth();
            return response;
        }

        [HttpGet("[action]")]
        public List<StatisticsPerCardTypeDTO> GetDashboardStatisticsPerCardTypePerCurrentMonth()
        {
            var response = _fraudService.GetDashboardStatisticsPerCardTypePerCurrentMonth();
            return response;
        }

        [HttpGet("[action]")]
        public List<StatisticsPerTransactionTypeDTO> GetDashboardStatisticsPerTransactionTypePerCurrentMonth()
        {
            var response = _fraudService.GetDashboardStatisticsPerTransactionTypePerCurrentMonth();
            return response;
        }
    }

    public class TransactionListRequest
    {
        public DateTime TransactionDate { get; set; }
    }
}
