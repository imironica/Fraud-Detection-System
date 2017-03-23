using MongoDB.Bson.Serialization.Attributes;

namespace FraudDetection.Models
{
    public class TransactionStatus
    {
        public string Code { get; set; }
        public string Name { get; set; }
    }
}
