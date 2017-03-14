using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FraudDetection.Models
{
    public class CardTypeDTO:Entity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Feature { get; set; }
        public double AprearenceProbability { get; set; }
        public double FraudProbability { get; set; }
    }
}
