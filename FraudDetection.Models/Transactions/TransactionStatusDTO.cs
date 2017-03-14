using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FraudDetection.Models
{
    public class TransactionStatusDTO:Entity
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
    }
}
