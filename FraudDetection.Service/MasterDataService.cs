using FraudDetection.Models;
using FraudDetection.Models.Transactions;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FraudDetection.Service
{
    public class MasterDataService : IMasterDataService
    {
        private MDRepository<TransactionDTO> _transactionRepo;
        private MDRepository<CountryDTO> _countryRepo;
        private MDRepository<ClientCountryDTO> _clientCountryRepo;
        private MDRepository<CardVendorDTO> _cardVendorRepo;
        private MDRepository<CardTypeDTO> _cardTypeRepo;
        private MDRepository<TransactionTypeDTO> _transactionTypeRepo;

        public MasterDataService()
        {
            _transactionRepo = new MDRepository<TransactionDTO>("Transactions");
            _countryRepo = new MDRepository<CountryDTO>("Countries");
            _clientCountryRepo = new MDRepository<ClientCountryDTO>("ClientCountries");
            _cardVendorRepo = new MDRepository<CardVendorDTO>("CardVendors");
            _cardTypeRepo = new MDRepository<CardTypeDTO>("CardTypes");
            _transactionTypeRepo = new MDRepository<TransactionTypeDTO>("TransactionTypes");
        }

        public List<CardVendorDTO> GetCardVendors()
        {
            return _cardVendorRepo.GetAllList();
        }
        public List<CardTypeDTO> GetCardTypes()
        {
            return _cardTypeRepo.GetAllList();
        }

        public List<TransactionTypeDTO> GetTransactionTypes()
        {
            return _transactionTypeRepo.GetAllList();
        }

        public List<CountryDTO> GetCountries()
        {
            return _countryRepo.GetAllList();
        }

        public List<ClientCountryDTO> GetClientCountries()
        {
            return _clientCountryRepo.GetAllList();
        }

        public List<Merchant> GetMerchants(int countryId)
        {
            var merchantsList = _countryRepo.Find(c => c.CountryId == countryId).FirstOrDefault().Merchants;
            return merchantsList;
        }

        public List<TransactionStatus> GetTransactionStatus()
        {            
            return null;
        }
    }
}
