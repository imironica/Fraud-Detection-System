using FraudDetection.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FraudDetection.Service
{
    public interface IFraudDetectionService
    {
        List<TransactionDTO> GetAlerts();
        TransactionAlertReponse VerifyAlert(TransactionDTO transaction);
        bool InsertTransactionList(List<TransactionDTO> lstTransactions);
        DailyStatisticsDTO GetDailyStatistics();
        MonthStatisticDTO GetDashboardStatisticsPerCurrentMonth();
    }
}
