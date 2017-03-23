using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace FraudDetection.Models.Transactions
{
    [BsonIgnoreExtraElements]
    public class ClientCountryDTO : Entity
    {
        public int ClientCountryId { get; set; }
        public string Name { get; set; }
        public double Probability { get; set; }
    }
}
