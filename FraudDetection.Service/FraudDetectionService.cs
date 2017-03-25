using FraudDetection.Models;
using FraudDetection.Models.Transactions;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace FraudDetection.Service
{
    public class FraudDetectionService : IFraudDetectionService
    {
        private MDRepository<TransactionDTO> _transactionRepo;
        private MDRepository<CountryDTO> _countryRepo;
        private MDRepository<ClientCountryDTO> _clientCountryRepo;
        private MDRepository<CardVendorDTO> _cardVendorRepo;
        private MDRepository<CardTypeDTO> _cardTypeRepo;
        private MDRepository<TransactionTypeDTO> _transactionTypeRepo;

        public FraudDetectionService()
        {
            _transactionRepo = new MDRepository<TransactionDTO>("Transactions");
            _countryRepo = new MDRepository<CountryDTO>("Countries");
            _clientCountryRepo = new MDRepository<ClientCountryDTO>("ClientCountries");
            _cardVendorRepo = new MDRepository<CardVendorDTO>("CardVendors");
            _cardTypeRepo = new MDRepository<CardTypeDTO>("CardTypes");
            _transactionTypeRepo = new MDRepository<TransactionTypeDTO>("TransactionTypes");
        }

        public List<TransactionDTO> GetAlerts()
        {
            var list = _transactionRepo.Find((x => x.TransactionDate.Equals(DateTime.Today.ToString("dd/MM/yyyy"))))
                                                .OrderByDescending(y => y.FraudProbability).ToList();
            //var list = repo.Find((x => x.Verified == false)).OrderByDescending(y=> y.FraudProbability).ToList();
            return list;
        }
        public TransactionDTO GetAlert(int id)
        {
            var list = _transactionRepo.Find(x => x.TransactionId == id);
            if (list != null && list.Count == 1)
                return list[0];
            return new TransactionDTO();
        }
        public bool InsertTransactionList(List<TransactionDTO> lstTransactions)
        {
            _transactionRepo.InsertMany(lstTransactions);
            return true;
        }

        public bool InsertTransation(TransactionDTO transaction)
        {
            transaction.InsertedTime = DateTime.Now;
            _transactionRepo.InsertOne(transaction);
            return true;
        }

        public TransactionAlertReponse VerifyAlert(TransactionDTO transaction)
        {
            var jsonString = JsonConvert.SerializeObject(transaction);
            var fraudProbability = 0;
            using (var client = new HttpClient())
            {
           

                var content = new StringContent(jsonString, Encoding.UTF8, "application/json");

                var result =  client.PostAsync("http://127.0.0.1:5000/verify", content).Result;
                if (result.IsSuccessStatusCode)
                {
                    
                }
                
            }

                var response = new TransactionAlertReponse()
            {
                Probability = 0
            };

            if (response.Probability == 1)
            {
                response.Status = "ALERT";
                return response;
            }
            if (response.Probability > 0.3)
            {
                response.Status = "WARNING";
                return response;
            }

            response.Status = "LOW";
            return response;

        }
        public DailyStatisticsDTO GetDailyStatistics()
        {
            var detectedFrauds = _transactionRepo.Find(t => t.Class == 0 && t.TransactionDateTimeFeature == DateTime.Today).Count();
            var goodTransactions = _transactionRepo.Find(t => t.Class == 1 && t.TransactionDateTimeFeature == DateTime.Today).Count();
            var unprocessedAlerts = _transactionRepo.Find(t => t.Verified == false && t.TransactionDateTimeFeature == DateTime.Today).Count();
            var processedAlerts = _transactionRepo.Find(t => t.Verified == true && t.TransactionDateTimeFeature == DateTime.Today).Count();

            return new DailyStatisticsDTO()
            {
                NumberOfFraudsDetected = detectedFrauds,
                NumberOfUnprocessedAlerts = unprocessedAlerts,
                NumberProcessedAlerts = processedAlerts,
                NumberGoodTransactions = goodTransactions
            };
        }
        public DashboardStatisticsDTO GetDashboardStatistics()
        {
            var detectedFraudsPerCurrentMonth = _transactionRepo.Find(t => t.Class.Equals(0)).Count;
            var numberOfIncorrectlyDetectedFrauds = _transactionRepo.Find(t => (t.Class.Equals(0) && t.Prediction.Equals(1)) || 
                                                                         (t.Class.Equals(1) && t.Prediction.Equals(0))).Count;
            var dashboardStatisticsDTO = new DashboardStatisticsDTO();
            dashboardStatisticsDTO.CurrentMonthStatistics = new MonthStatisticDTO()
            {
                NumberOfDetectedFraudsPerCurrentMonth = detectedFraudsPerCurrentMonth,
                NumberOfIncorrectlyDetectedFrauds = numberOfIncorrectlyDetectedFrauds,
            };
            dashboardStatisticsDTO.CurrentMonthStatistics.NumberOfSuccessfullyProcessedTransactions = dashboardStatisticsDTO.CurrentMonthStatistics.NumberOfDetectedFraudsPerCurrentMonth
                                                                                                    + dashboardStatisticsDTO.CurrentMonthStatistics.NumberOfIncorrectlyDetectedFrauds;
            return dashboardStatisticsDTO;
        }

        public MonthStatisticDTO GetDashboardStatisticsPerCurrentMonth()
        {
            var detectedFraudsPerCurrentMonth = _transactionRepo.Find(t => t.Class.Equals(0)).Count;
            var numberOfIncorrectlyDetectedFrauds = _transactionRepo.Find(t => (t.Class.Equals(0) && t.Prediction.Equals(1)) ||
                                                                   (t.Class.Equals(1) && t.Prediction.Equals(0))).Count;
            var currentMonthStatistics = new MonthStatisticDTO()
            {
                NumberOfDetectedFraudsPerCurrentMonth = detectedFraudsPerCurrentMonth,
                NumberOfIncorrectlyDetectedFrauds = numberOfIncorrectlyDetectedFrauds,
            };
            currentMonthStatistics.NumberOfSuccessfullyProcessedTransactions = currentMonthStatistics.NumberOfDetectedFraudsPerCurrentMonth
                                                                             + currentMonthStatistics.NumberOfIncorrectlyDetectedFrauds;
            return currentMonthStatistics;
        }

        public List<StatisticsPerCountryDTO> GetDashboardStatisticsPerCountryPerCurrentMonth()
        {
            var currentMonthStatisticsPerCountry = new List<StatisticsPerCountryDTO>();
            var countries = _countryRepo.GetAllList();

            foreach(var country in countries)
            {
                var statistic = new StatisticsPerCountryDTO();
                statistic.Country = country.Name;
                var detectedFraudsPerMonth = _transactionRepo.Find(t => t.Country.Equals(country.Name) && t.Class.Equals(0)).Count;
                var numberOfIncorrectlyDetectedFrauds = _transactionRepo.Find(t => (t.Class.Equals(0) && t.Prediction.Equals(1)) ||
                                                                       (t.Class.Equals(1) && t.Prediction.Equals(0))).Count;

                statistic.NumberOfDetectedFraudsPerMonth = detectedFraudsPerMonth;
                statistic.NumberOfIncorrectlyDetectedFrauds = numberOfIncorrectlyDetectedFrauds;

                currentMonthStatisticsPerCountry.Add(statistic);
            }

            return currentMonthStatisticsPerCountry;
        }

        public List<StatisticsPerClientCountryDTO> GetDashboardStatisticsPerClientCountryPerCurrentMonth()
        {
            var currentMonthStatisticsPerClientCountry = new List<StatisticsPerClientCountryDTO>();
            var clientCountries = _clientCountryRepo.GetAllList();

            foreach (var clientCountry in clientCountries)
            {
                var statistic = new StatisticsPerClientCountryDTO();
                statistic.ClientCountry = clientCountry.Name;
                var detectedFraudsPerMonth = _transactionRepo.Find(t => t.Country.Equals(clientCountry.Name) && t.Class.Equals(0)).Count;
                var numberOfIncorrectlyDetectedFrauds = _transactionRepo.Find(t => (t.Class.Equals(0) && t.Prediction.Equals(1)) ||
                                                                       (t.Class.Equals(1) && t.Prediction.Equals(0))).Count;

                statistic.NumberOfDetectedFraudsPerMonth = detectedFraudsPerMonth;
                statistic.NumberOfIncorrectlyDetectedFrauds = numberOfIncorrectlyDetectedFrauds;

                currentMonthStatisticsPerClientCountry.Add(statistic);
            }

            return currentMonthStatisticsPerClientCountry;
        }

        public List<StatisticsPerCardVendorDTO> GetDashboardStatisticsPerCardVendorPerCurrentMonth()
        {
            var currentMonthStatisticsPerCardVendor = new List<StatisticsPerCardVendorDTO>();
            var cardVendors = _cardTypeRepo.GetAllList();

            foreach(var cardVendor in cardVendors)
            {
                var statistic = new StatisticsPerCardVendorDTO();
                statistic.CardVendor = cardVendor.Name;
                var detectedFraudsPerMonth = _transactionRepo.Find(t => t.CardVendor.Equals(cardVendor.Name)).Count;
                var numberOfIncorrectlyDetectedFrauds = _transactionRepo.Find(t => (t.Class.Equals(0) && t.Prediction.Equals(1)) ||
                                                                       (t.Class.Equals(1) && t.Prediction.Equals(0))).Count;

                statistic.NumberOfDetectedFraudsPerMonth = detectedFraudsPerMonth;
                statistic.NumberOfIncorrectlyDetectedFrauds = numberOfIncorrectlyDetectedFrauds;

                currentMonthStatisticsPerCardVendor.Add(statistic);
            }

            return currentMonthStatisticsPerCardVendor;
        }

        public List<StatisticsPerCardTypeDTO> GetDashboardStatisticsPerCardTypePerCurrentMonth()
        {
            var currentMonthStatisticsPerCardType = new List<StatisticsPerCardTypeDTO>();
            var cardTypes = _cardTypeRepo.GetAllList();

            foreach (var cardType in cardTypes)
            {
                var statistic = new StatisticsPerCardTypeDTO();
                statistic.CardType = cardType.Name;
                var detectedFraudsPerMonth = _transactionRepo.Find(t => t.CardType.Equals(cardType.Name) && t.Class.Equals(0)).Count;
                var numberOfIncorrectlyDetectedFrauds = _transactionRepo.Find(t => (t.Class.Equals(0) && t.Prediction.Equals(1)) ||
                                                                       (t.Class.Equals(1) && t.Prediction.Equals(0))).Count;

                statistic.NumberOfDetectedFraudsPerMonth = detectedFraudsPerMonth;
                statistic.NumberOfIncorrectlyDetectedFrauds = numberOfIncorrectlyDetectedFrauds;

                currentMonthStatisticsPerCardType.Add(statistic);
            }

            return currentMonthStatisticsPerCardType;
        }

        public List<StatisticsPerTransactionTypeDTO> GetDashboardStatisticsPerTransactionTypePerCurrentMonth()
        {
            var currentMonthStatisticsPerTransactionType = new List<StatisticsPerTransactionTypeDTO>();
            var transactionTypes = _transactionTypeRepo.GetAllList();

            foreach (var transactionType in transactionTypes)
            {
                var statistic = new StatisticsPerTransactionTypeDTO();
                statistic.TransactionType = transactionType.Name;
                var detectedFraudsPerMonth = _transactionRepo.Find(t => t.TransactionType.Equals(transactionType.Name) && t.Class.Equals(0)).Count;
                var numberOfIncorrectlyDetectedFrauds = _transactionRepo.Find(t => (t.Class.Equals(0) && t.Prediction.Equals(1)) ||
                                                                       (t.Class.Equals(1) && t.Prediction.Equals(0))).Count;

                statistic.NumberOfDetectedFraudsPerMonth = detectedFraudsPerMonth;
                statistic.NumberOfIncorrectlyDetectedFrauds = numberOfIncorrectlyDetectedFrauds;

                currentMonthStatisticsPerTransactionType.Add(statistic);
            }

            return currentMonthStatisticsPerTransactionType;
        }

        public bool SaveTransactionStatus(int transactionId, int statusCode)
        {
            var repo = new MDRepository<TransactionDTO>();
            var update = Builders<TransactionDTO>.Update.Set("Class", statusCode).Set("Verified", true);
            repo.Update(x => x.TransactionId == transactionId, update);
            return true;
        }
    }
}