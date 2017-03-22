using System.Collections.Generic;
using FraudDetection.Models;
using FraudDetection.Models.Transactions;

namespace FraudDetection.Service
{
    public interface IMasterDataService
    {
        List<CardTypeDTO> GetCardTypes();
        List<TransactionStatus> GetTransactionStatus();
        List<TransactionTypeDTO> GetTransactionType();
        List<CountryDTO> GetCountries();
        List<Merchant> GetMerchants(int countryId);
    }
}