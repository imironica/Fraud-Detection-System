using FraudDetection.Models.Transactions;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace FraudDetection.Models
{
    [BsonIgnoreExtraElements]
    public class CountryDTO : Entity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Probability { get; set; }
        public LatitudeDTO Latitude { get; set; }
        public LongitudeDTO Longitude { get; set; }
        public List<MerchantDTO> Merchants { get; set; }
    }
}
