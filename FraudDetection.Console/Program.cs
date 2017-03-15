using FraudDetection.Models;
using FraudDetection.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FraudDetection.Console
{
    public class Program
    {
        #region Random data
        private static Random rng = new Random();

        private static string[] transactionDetailsMockValues = new[]
        {
            "American", "Credit ", "Amount ", "Result ", "Balance ", "transaction "
        };
        private static string[] countriesMockValues = new[]
        {
            "Germany", "France", "Italy", "Romania"
        };
        private static DateTime RandomDay()
        {
            DateTime start = new DateTime(1995, 1, 1);
            int range = (DateTime.Today - start).Days;
            return start.AddDays(rng.Next(range));
        }
        #endregion

        public static void Main(string[] args)
        {
            var option = string.Empty;
            while (option != "0")
            {
                ShowOptions();
                option = System.Console.ReadLine();
                if (option == "0")
                    return;
                if (option == "1")
                    AddMockValuesToDb();
                if (option == "2")
                    AddMockValuesToDb();
                if (option == "3")
                    AddMockValuesToDbForCurrentDay();
            }
        }

        private static void ShowOptions()
        {
            System.Console.WriteLine("Options: ");
            System.Console.WriteLine("1 - Generate database: ");
            System.Console.WriteLine("2 - Generate new data for current day: ");
            System.Console.WriteLine("3 - Retrain the algorithm: ");
            System.Console.WriteLine("0 - Exit: ");
        }

        private static void AddMockValuesToDb()
        {
            var insertDictionariesDb = false;
            var seed = new DatabaseSeed();
            List<CardTypeDTO> lstCardTypes = seed.SeedCardType(insertDictionariesDb);
            List<TransactionStatusDTO> lstTransactionStatus = seed.SeedTransactionStatus(insertDictionariesDb);
            List<TransactionTypeDTO> lstTransactionTypes = seed.SeedTransactionType(insertDictionariesDb);
            List<CountryDTO> lstCountries = seed.SeedTransactionCountries(insertDictionariesDb);


            var lstCardTypesProb = SeedProbabilities.SeedCardType(lstCardTypes);
            var lstTranTypesProb = SeedProbabilities.SeedTransactionType(lstTransactionTypes);
            var lstTranCountriesProb = SeedProbabilities.SeedCountries(lstCountries);
            int probabilityId = 0;
            double fraudProbability = 0;

            var transactionsList = new List<TransactionDTO>();
            for (int i = 0; i < 1000; i++)
            {
                fraudProbability = 0;
                var guid = Guid.NewGuid();
                var transaction = new TransactionDTO();
                transaction._id = guid;
                transaction.TransactionID = guid.ToString();

                probabilityId = Convert.ToInt32(rng.Next(lstCardTypesProb.Count - 1));

                transaction.CardType = lstCardTypesProb[probabilityId].Name;
                transaction.CardTypeFeature = lstCardTypesProb[probabilityId].Feature;
                fraudProbability += lstCardTypesProb[probabilityId].FraudProbability;

                probabilityId = Convert.ToInt32(rng.Next(lstTranTypesProb.Count - 1));

                transaction.TransactionType = lstTranTypesProb[probabilityId].Name;
                transaction.TransactionTypeFeature = lstTranTypesProb[probabilityId].Feature;
                fraudProbability += lstTranTypesProb[probabilityId].FraudProbability;

                probabilityId = Convert.ToInt32(rng.Next(lstTranTypesProb.Count - 1));

                transaction.Country = lstTranCountriesProb[probabilityId].Name;
                transaction.CountryFeature = lstTranCountriesProb[probabilityId].Feature;
                fraudProbability += lstTranCountriesProb[probabilityId].FraudProbability;

                probabilityId = Convert.ToInt32(rng.Next(lstTranTypesProb.Count - 1));

                transaction.ClientCountry = lstTranCountriesProb[probabilityId].Name;
                transaction.ClientCountryFeature = lstTranCountriesProb[probabilityId].Feature;
                fraudProbability += lstTranCountriesProb[probabilityId].FraudProbability;

                probabilityId = Convert.ToInt32(rng.Next(lstTranTypesProb.Count - 1));

                transaction.MerchantCode = transactionDetailsMockValues[rng.Next(transactionDetailsMockValues.Length)];
                transaction.Country = countriesMockValues[rng.Next(countriesMockValues.Length)];

                transaction.InsertedTime = RandomDay();
                

                if (fraudProbability > 0.3)
                {
                    transaction.Status = lstTransactionStatus.Where(x => x.Code == "ALERT").FirstOrDefault().Name;
                    transaction.StatusCode = "ALERT";
                }
                else
                {
                    transaction.Status = lstTransactionStatus.Where(x => x.Code == "NONFRAUD").FirstOrDefault().Name;
                    transaction.StatusCode = "NONFRAUD";
                }

                transaction.FraudProbability = fraudProbability;

                transactionsList.Add(transaction);
            }
            

            var repo = new MDRepository<TransactionDTO>();
            repo.InsertMany(transactionsList);
            System.Console.WriteLine("New alerts have been uploaded to the database .... ");

        }




        private static void AddMockValuesToDbForCurrentDay()
        {
            //TODO
            System.Console.WriteLine("New alerts have been uploaded to the database .... ");
        }

        private static void RetrainAlgorithm()
        {
            //TODO
            System.Console.WriteLine("Algorithm have been retrained with new data .... ");
        }
    }
}
