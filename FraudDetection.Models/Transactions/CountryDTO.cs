using FraudDetection.Models.Transactions;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace FraudDetection.Models
{
    [BsonIgnoreExtraElements]
    public class CountryDTO : Entity
    {
        public int CountryId { get; set; }
        public string Name { get; set; }
        public double Probability { get; set; }
        public Latitude Latitude { get; set; }
        public Longitude Longitude { get; set; }
        public List<Merchant> Merchants { get; set; }
    }
}
