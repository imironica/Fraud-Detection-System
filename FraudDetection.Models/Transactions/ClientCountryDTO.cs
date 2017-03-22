using System;
using System.Collections.Generic;
using System.Text;

namespace FraudDetection.Models.Transactions
{
    public class ClientCountryDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Probability { get; set; }
    }
}
