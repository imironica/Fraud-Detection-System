using System;
using System.Collections.Generic;
using System.Text;

namespace FraudDetection.Models.Transactions
{
    public class CardVendorDTO : Entity
    {
        public int CardVendorId { get; set; }
        public string Name { get; set; }
        public int CardStart { get; set; }
    }
}
