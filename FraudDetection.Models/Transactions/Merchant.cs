using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace FraudDetection.Models.Transactions
{
    [BsonIgnoreExtraElements]
    public class Merchant
    {
        public int MerchantId { get; set; }
        public string Name { get; set; }
        public double Probability { get; set; }
    }
}
