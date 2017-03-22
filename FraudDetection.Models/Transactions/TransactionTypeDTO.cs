using MongoDB.Bson.Serialization.Attributes;

namespace FraudDetection.Models
{
    [BsonIgnoreExtraElements]
    public class TransactionTypeDTO : Entity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Feature { get; set; }
        public double AprearenceProbability { get; set; }
        public double FraudProbability { get; set; }
    }
}
