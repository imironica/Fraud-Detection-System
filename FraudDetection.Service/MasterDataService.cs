using FraudDetection.Models;
using MongoDB.Driver;
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

        public List<TransactionStatus> GetTransactionStatus()
        {
            var repo = new MDRepository<TransactionStatus>("transactionStatus");
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
