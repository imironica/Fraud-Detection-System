using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FraudDetection.Models
{
    public class DailyStatisticsDTO
    {
        public int NumberOfUnprocessedAlerts { get; set; }
        public int NumberProcessedAlerts { get; set; }
        public int NumberOfFraudsDetected { get; set; }
    }
}
