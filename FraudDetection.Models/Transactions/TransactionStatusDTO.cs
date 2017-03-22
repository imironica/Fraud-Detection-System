using MongoDB.Bson.Serialization.Attributes;

namespace FraudDetection.Models
{
    [BsonIgnoreExtraElements]
    public class TransactionStatusDTO : Entity
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
    }
}
