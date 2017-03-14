using FraudDetection.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FraudDetection.Service
{
    public class MasterDataService:IMasterDataService
    {
        public List<CardTypeDTO> GetCardTypes()
        {
            var repo = new MDRepository<CardTypeDTO>("cardType");
            var lst = repo.GetAllList();
            return lst;
        }

        public List<TransactionStatusDTO> GetTransactionStatus()
        {
            var repo = new MDRepository<TransactionStatusDTO>("transactionStatus");
            var lst = repo.GetAllList();
            return lst;
        }

        public List<TransactionTypeDTO> GetTransactionType()
        {
            var repo = new MDRepository<TransactionTypeDTO>("transactionType");
            var lst = repo.GetAllList();
            return lst;
        }

        public List<CountryDTO> GetCountries()
        {
            var repo = new MDRepository<CountryDTO>("country");
            var lst = repo.GetAllList();
            return lst;
        }

    }
}
