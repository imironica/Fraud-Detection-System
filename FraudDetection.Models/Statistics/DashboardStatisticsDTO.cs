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
        }
        public List<StatisticsPerCountryDTO> StatisticsPerCountry { get; set; }
        public MonthStatisticDTO CurrentMonthStatistics { get; set; }
    }

    public class MonthStatisticDTO
    {
        public int NumberOfDetectedFraudsPerCurrentMonth { get; set; }
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

}
