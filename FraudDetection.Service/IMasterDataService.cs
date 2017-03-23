using System.Collections.Generic;
using FraudDetection.Models;
using FraudDetection.Models.Transactions;

namespace FraudDetection.Service
{
    public interface IMasterDataService
    {
        List<CardTypeDTO> GetCardTypes();
        List<CardVendorDTO> GetCardVendors();
        List<TransactionTypeDTO> GetTransactionTypes();
        List<CountryDTO> GetCountries();
        List<ClientCountryDTO> GetClientCountries();
        List<Merchant> GetMerchants(int countryId);
        List<TransactionStatus> GetTransactionStatus();
    }
}