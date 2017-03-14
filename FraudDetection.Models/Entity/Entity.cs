using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FraudDetection.Models
{
    public class Entity
    {
        public DateTime? CreatedAt { get; set; }
        public DateTime? ModifiedAt { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public bool IsDeleted { get; set; }
    }
}
