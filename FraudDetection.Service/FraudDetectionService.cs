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
    class Data 
    {
        [JsonProperty("fraudProbability")]
        public float fraudProbabilty { get; set; }
    }
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

        public List<TransactionDTO> GetAlerts(DateTime date)
        {
            var list = _transactionRepo.Find((x => x.TransactionDate.Equals(date.ToString("dd/MM/yyyy"))))
                                                .OrderByDescending(y => y.FraudProbability).ToList();
            return list;
        }

        public TransactionClientResponse GetTransaction(string sms, string smsCode)
        {
            var response = new TransactionClientResponse();
            var transaction = _transactionRepo.GetAll().FirstOrDefault();
            if (transaction == null)
                response.TransactionStatus = "INVALID";
            else
            {
                response.TransactionStatus = "VALID";
                response.Transaction = transaction;
            }
            return response;
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

        public async Task<TransactionAlertReponse> VerifyAlert(TransactionDTO transaction)
        {
            var jsonString = JsonConvert.SerializeObject(transaction);
            var fraudProbability = 0.0;
            using (var client = new HttpClient())
            {


                var content = new StringContent(jsonString, Encoding.UTF8, "application/json");

                var result = await client.PostAsync("http://127.0.0.1:5000/verify", content);
                if (result.IsSuccessStatusCode)
                {
                    var responseBody = await result.Content.ReadAsStringAsync();
      
                    Data data = JsonConvert.DeserializeObject<Data>(responseBody);
                    fraudProbability = data.fraudProbabilty;
                    
                }
                
            }

                var response = new TransactionAlertReponse()
            {
                Probability = fraudProbability
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
            string today = DateTime.Today.ToString("dd/MM/yyyy");
            var detectedFrauds = _transactionRepo.Find(t => t.Class == 0 && t.TransactionDate == today).Count();
            var goodTransactions = _transactionRepo.Find(t => t.Class == 1 && t.TransactionDate == today).Count();
            var unprocessedAlerts = _transactionRepo.Find(t => t.Verified == false && t.TransactionDate == today).Count();
            var processedAlerts = _transactionRepo.Find(t => t.Verified == true && t.TransactionDate == today).Count();

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

        public List<DailyStatisticsPerLastMonthDTO> GetDashboardDailyStatisticsPerLastMonth()
        {
            var dailyStatisticsPerLastMonth = new List<DailyStatisticsPerLastMonthDTO>();
            string currentMonth = DateTime.Today.ToString("dd/MM/yyyy").Substring(3,2);
            string currentYear = DateTime.Today.ToString("dd/MM/yyyy").Substring(6,4);
            int daysInMonth = DateTime.DaysInMonth(2017, int.Parse(currentMonth));
            var transactionListPerLastMonth = _transactionRepo.Find(t => t.TransactionDate.Substring(3,2).Equals(currentMonth));
            
            foreach (var item in transactionListPerLastMonth)
            {
                var statistic = new DailyStatisticsPerLastMonthDTO();
                statistic.Day = item.TransactionDate.Substring(0,2);
                statistic.NumberOfDetectedFrauds = _transactionRepo.Find(t => t.TransactionDate.Substring(0, 2).Equals(statistic.Day) 
                                                                           && t.Class == 0).Count;
                dailyStatisticsPerLastMonth.Add(statistic);
            }

            return dailyStatisticsPerLastMonth;
        }

        public List<StatisticsPerCountryDTO> GetDashboardStatisticsPerCountryPerCurrentMonth()
        {
            var currentMonthStatisticsPerCountry = new List<StatisticsPerCountryDTO>();
            var countries = _countryRepo.GetAllList();

            foreach (var country in countries)
            {
                var statistic = new StatisticsPerCountryDTO();
                statistic.Country = country.Name;
                var detectedFraudsPerMonth = _transactionRepo.Find(t => t.Country.Equals(country.Name) && t.Class.Equals(0)).Count;
                var numberOfIncorrectlyDetectedFrauds = _transactionRepo.Find(t => (t.Class.Equals(0) && t.Prediction.Equals(1)) ||
                                                                       (t.Class.Equals(1) && t.Prediction.Equals(0))).Count;

                statistic.NumberOfDetectedFraudsPerMonth = detectedFraudsPerMonth;
                statistic.NumberOfIncorrectlyDetectedFrauds = numberOfIncorrectlyDetectedFrauds;
                statistic.NumberOfSuccessfullyProcessedTransactions = statistic.NumberOfDetectedFraudsPerMonth + statistic.NumberOfIncorrectlyDetectedFrauds;

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
                statistic.NumberOfSuccessfullyProcessedTransactions = statistic.NumberOfDetectedFraudsPerMonth + statistic.NumberOfIncorrectlyDetectedFrauds;

                currentMonthStatisticsPerClientCountry.Add(statistic);
            }

            return currentMonthStatisticsPerClientCountry;
        }

        public List<StatisticsPerCardVendorDTO> GetDashboardStatisticsPerCardVendorPerCurrentMonth()
        {
            var currentMonthStatisticsPerCardVendor = new List<StatisticsPerCardVendorDTO>();
            var cardVendors = _cardVendorRepo.GetAllList();

            foreach (var cardVendor in cardVendors)
            {
                var statistic = new StatisticsPerCardVendorDTO();
                statistic.CardVendor = cardVendor.Name;
                var detectedFraudsPerMonth = _transactionRepo.Find(t => t.CardVendor.Equals(cardVendor.Name) && t.Class.Equals(0)).Count;
                var numberOfIncorrectlyDetectedFrauds = _transactionRepo.Find(t => (t.Class.Equals(0) && t.Prediction.Equals(1)) ||
                                                                       (t.Class.Equals(1) && t.Prediction.Equals(0))).Count;

                statistic.NumberOfDetectedFraudsPerMonth = detectedFraudsPerMonth;
                statistic.NumberOfIncorrectlyDetectedFrauds = numberOfIncorrectlyDetectedFrauds;
                statistic.NumberOfSuccessfullyProcessedTransactions = statistic.NumberOfDetectedFraudsPerMonth + statistic.NumberOfIncorrectlyDetectedFrauds;

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
                statistic.NumberOfSuccessfullyProcessedTransactions = statistic.NumberOfDetectedFraudsPerMonth + statistic.NumberOfIncorrectlyDetectedFrauds;

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
                statistic.NumberOfSuccessfullyProcessedTransactions = statistic.NumberOfDetectedFraudsPerMonth + statistic.NumberOfIncorrectlyDetectedFrauds;

                currentMonthStatisticsPerTransactionType.Add(statistic);
            }

            return currentMonthStatisticsPerTransactionType;
        }

        public bool SaveTransactionStatus(int transactionId, int statusCode)
        {
            var repo = new MDRepository<TransactionDTO>();
            var update = Builders<TransactionDTO>.Update.Set("Class", statusCode);
            repo.Update(x => x.TransactionId == transactionId, update);
            update = Builders<TransactionDTO>.Update.Set("Verified", true);
            repo.Update(x => x.TransactionId == transactionId, update);
            return true;
        }
    }
}