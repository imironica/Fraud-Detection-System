using MongoDB.Bson.Serialization.Attributes;

namespace FraudDetection.Models
{
    [BsonIgnoreExtraElements]
    public class TransactionTypeDTO : Entity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Probability { get; set; }
    }
}
