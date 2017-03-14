using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FraudDetection.Models
{
    public class TransactionAlertReponse
    {
        public double Probability { get; set; }
        public string Status { get; set; }
    }
}
