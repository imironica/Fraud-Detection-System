using System.Collections.Generic;
using FraudDetection.Models;

namespace FraudDetection.Service
{
    public interface IMasterDataService
    {
        List<CardTypeDTO> GetCardTypes();
        List<TransactionStatus> GetTransactionStatus();
        List<TransactionTypeDTO> GetTransactionType();
        List<CountryDTO> GetCountries();
    }
}