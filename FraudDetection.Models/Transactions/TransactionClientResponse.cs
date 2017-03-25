using System;
using System.Collections.Generic;
using System.Text;

namespace FraudDetection.Models
{
    public class TransactionClientResponse
    {
        public TransactionDTO Transaction { get; set; }
        public string TransactionStatus { get; set; }
        public string Message { get; set; }
    }
}
