using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FraudDetection.Models
{
    public class DashboardStatisticsDTO
    {
        public DashboardStatisticsDTO()
        {
            StatisticsPerCountry = new List<StatisticsPerCountryDTO>();
            StatisticsPerClientCountry = new List<StatisticsPerClientCountryDTO>();
            StatisticsPerCardVendor = new List<StatisticsPerCardVendorDTO>();
            StatisticsPerCardType = new List<StatisticsPerCardTypeDTO>();
            StatisticsPerTransactionType = new List<StatisticsPerTransactionTypeDTO>();
        }
        public MonthStatisticDTO CurrentMonthStatistics { get; set; }
        public List<DailyStatisticsPerLastMonthDTO> MonthlyStatistics { get; set; }
        public List<StatisticsPerCountryDTO> StatisticsPerCountry { get; set; }
        public List<StatisticsPerClientCountryDTO> StatisticsPerClientCountry { get; set; }
        public List<StatisticsPerCardVendorDTO> StatisticsPerCardVendor { get;set;}
        public List<StatisticsPerCardTypeDTO> StatisticsPerCardType { get; set; }
        public List<StatisticsPerTransactionTypeDTO> StatisticsPerTransactionType { get; set; }
    }

    public class MonthStatisticDTO
    {
        public int NumberOfDetectedFraudsPerCurrentMonth { get; set; }
        public int NumberOfSuccessfullyProcessedTransactions { get; set; }
        public int NumberOfIncorrectlyDetectedFrauds { get; set; }
    }

    public class DailyStatisticsPerLastMonthDTO
    {
        public string Day { get; set; }
        public int NumberOfDetectedFraudsDailyPerLastMonth { get; set; }
        public int NumberOfSuccessfullyProcessedTransactions { get; set; }
        public int NumberOfIncorrectlyDetectedFrauds { get; set; }
    }

    public class StatisticsPerCountryDTO
    {
        public string Country { get; set; }
        public int NumberOfDetectedFraudsPerMonth { get; set; }
        public int NumberOfSuccessfullyProcessedTransactions { get; set; }
        public int NumberOfIncorrectlyDetectedFrauds { get; set; }
    }

    public class StatisticsPerClientCountryDTO
    {
        public string ClientCountry { get; set; }
        public int NumberOfDetectedFraudsPerMonth { get; set; }
        public int NumberOfSuccessfullyProcessedTransactions { get; set; }
        public int NumberOfIncorrectlyDetectedFrauds { get; set; }
    }

    public class StatisticsPerCardVendorDTO
    {
        public string CardVendor { get; set; }
        public int NumberOfDetectedFraudsPerMonth { get; set; }
        public int NumberOfSuccessfullyProcessedTransactions { get; set; }
        public int NumberOfIncorrectlyDetectedFrauds { get; set; }
    }

    public class StatisticsPerCardTypeDTO
    {
        public string CardType { get; set; }
        public int NumberOfDetectedFraudsPerMonth { get; set; }
        public int NumberOfSuccessfullyProcessedTransactions { get; set; }
        public int NumberOfIncorrectlyDetectedFrauds { get; set; }
        public int SavedAmount { get; set; }
    }

    public class StatisticsPerTransactionTypeDTO
    {
        public string TransactionType { get; set; }
        public int NumberOfDetectedFraudsPerMonth { get; set; }
        public int NumberOfSuccessfullyProcessedTransactions { get; set; }
        public int NumberOfIncorrectlyDetectedFrauds { get; set; }
    }
}
