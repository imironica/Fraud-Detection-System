using FraudDetection.Models;
using FraudDetection.Models.Transactions;
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
            var repo = new MDRepository<CardTypeDTO>("card_types");
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
            var repo = new MDRepository<TransactionTypeDTO>("transaction_types");
            var lst = repo.GetAllList();
            return lst;
        }

        public List<CountryDTO> GetCountries()
        {
            var repo = new MDRepository<CountryDTO>("countries");
            var lst = repo.GetAllList();
            return lst;
        }

        public List<Merchant> GetMerchants(int countryId)
        {
            var repo = new MDRepository<CountryDTO>("countries");
            var merchantsList =  repo.Find(c => c.CountryId == countryId).FirstOrDefault().Merchants;
            return merchantsList;
        }
    }
}
