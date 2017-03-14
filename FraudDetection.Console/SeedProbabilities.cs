using FraudDetection.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FraudDetection.Console
{
    public class SeedProbabilities
    {
        public static List<CardTypeDTO>  SeedCardType(List<CardTypeDTO> lstCardTypes)
        {
            List<CardTypeDTO> lstResponse = new List<CardTypeDTO>();
            foreach (var cardType in lstCardTypes)
            {
                var probability = cardType.AprearenceProbability;
                for (int i = 0; i < Convert.ToInt32(probability * 100); i++)
                {
                    lstResponse.Add(cardType);
                }
            }
            return lstResponse;
        }
        public static List<TransactionTypeDTO> SeedTransactionType(List<TransactionTypeDTO> lst)
        {
            List<TransactionTypeDTO> lstResponse = new List<TransactionTypeDTO>();
            foreach (var value in lst)
            {
                var probability = value.AprearenceProbability;
                for (int i = 0; i < Convert.ToInt32(probability * 100); i++)
                {
                    lstResponse.Add(value);
                }
            }
            return lstResponse;
        }

        public static List<CountryDTO> SeedCountries(List<CountryDTO> lst)
        {
            var lstResponse = new List<CountryDTO>();
            foreach (var value in lst)
            {
                var probability = value.AprearenceProbability;
                for (int i = 0; i < Convert.ToInt32(probability * 100); i++)
                {
                    lstResponse.Add(value);
                }
            }
            return lstResponse;
        }
    }
}
