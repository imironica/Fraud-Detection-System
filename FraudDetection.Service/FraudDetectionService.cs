using FraudDetection.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FraudDetection.Service
{
    public class FraudDetectionService : IFraudDetectionService
    {
        public FraudDetectionService()
        {

        }

        public List<TransactionDTO> GetAlerts()
        {
            var repo = new MDRepository<TransactionDTO>();
            var lst = repo.Find((x => x.TransactionDate.Equals(DateTime.Today.ToString("dd/MM/yyyy"))))
                                                .OrderByDescending(y => y.FraudProbability).ToList();
            //var lst = repo.Find((x => x.Verified == false)).OrderByDescending(y=> y.FraudProbability).ToList();
            return lst;
        }
        public TransactionDTO GetAlert(int id)
        {
            var repo = new MDRepository<TransactionDTO>();
            var lst = repo.Find(x => x.TransactionID == id);
            if (lst != null && lst.Count == 1)
                return lst[0];
            return new TransactionDTO();
        }
        public bool InsertTransactionList(List<TransactionDTO> lstTransactions)
        {
            var repo = new MDRepository<TransactionDTO>();
            repo.InsertMany(lstTransactions);
            return true;
        }

        public bool InsertTransation(TransactionDTO transaction)
        {
            var repo = new MDRepository<TransactionDTO>();
            repo.InsertOne(transaction);
            return true;
        }

        public TransactionAlertReponse VerifyAlert(TransactionDTO transaction)
        {
            //TODO: query the ML service

            Random rnd = new Random();
            var response = new TransactionAlertReponse()
            {
                Probability = rnd.Next(100)
            };
            if (response.Probability > 90)
            {
                response.Status = "ALERT";
                return response;
            }
            if (response.Probability > 60)
            {
                response.Status = "WARNING";
                return response;
            }

            response.Status = "LOW";
            return response;

        }
        public DailyStatisticsDTO GetDailyStatistics()
        {
            //TODO: query the MongoDb
            return new DailyStatisticsDTO()
            {
                NumberOfFraudsDetected = 19,
                NumberOfUnprocessedAlerts = 50,
                NumberProcessedAlerts = 100
            };
        }
        public DashboardStatisticsDTO GetDashboardStatistics()
        {
            //TODO: query the MongoDb
            var dashboardStatisticsDTO = new DashboardStatisticsDTO();
            dashboardStatisticsDTO.CurrentMonthStatistics = new MonthStatisticDTO()
            {
                NumberOfDetectedFraudsPerCurrentMonth = 560,
                NumberOfIncorrectlyDetectedFrauds = 150,
            };
            dashboardStatisticsDTO.CurrentMonthStatistics.NumberOfSuccessfullyProcessedTransactions = dashboardStatisticsDTO.CurrentMonthStatistics.NumberOfDetectedFraudsPerCurrentMonth
                + dashboardStatisticsDTO.CurrentMonthStatistics.NumberOfIncorrectlyDetectedFrauds;
            return dashboardStatisticsDTO;
        }

        public MonthStatisticDTO GetDashboardStatisticsPerCurrentMonth()
        {
            //TODO: query the MongoDb
            var currentMonthStatistics = new MonthStatisticDTO()
            {
                NumberOfDetectedFraudsPerCurrentMonth = 560,
                NumberOfIncorrectlyDetectedFrauds = 150,
            };
            currentMonthStatistics.NumberOfSuccessfullyProcessedTransactions = currentMonthStatistics.NumberOfDetectedFraudsPerCurrentMonth
                + currentMonthStatistics.NumberOfIncorrectlyDetectedFrauds;
            return currentMonthStatistics;
        }

        public bool SaveTransactionStatus(int transactionID, int statusCode)
        {
            var repo = new MDRepository<TransactionDTO>();
            var update = Builders<TransactionDTO>.Update.Set("Class", statusCode);
            repo.Update(x=>x.TransactionID == transactionID, update);
            return true;
        }
    }
}
