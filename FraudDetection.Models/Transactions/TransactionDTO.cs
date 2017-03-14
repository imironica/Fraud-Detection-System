using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FraudDetection.Models
{
    public class TransactionDTO : Entity
    {
        public TransactionDTO()
        {

        }
        public object _id { get; set; }
        public int TransactionID { get; set; }
        public string TransactionType { get; set; }
        public double TransactionTypeFeature { get; set; }
        public decimal Amount { get; set; }
        public double AmountFeature { get; set; }
        public string MerchantCode { get; set; }
        public double MerchantCodeFeature { get; set; }
        public string OutletCode { get; set; }
        public double OutletCodeFeature { get; set; }
        public string CardNumber { get; set; }
        public string CardExpiryDate { get; set; }
        public double CardExpiryDateFeature { get; set; }
        public string CardType { get; set; }
        public double CardTypeFeature { get; set; }
        public string TransactionDate { get; set; }
        public double TransactionDateFeature { get; set; }
        public string TransactionTime { get; set; }
        public double TransactionTimeFeature { get; set; }
        public double Longitude { get; set; }
        public double LongitudeFeature { get; set; }
        public double Latitude { get; set; }
        public double LatitudeFeature { get; set; }
        public string TransactionCurency { get; set; }
        public double TransactionCurencyFeature { get; set; }
        public int LoginAtempts { get; set; }
        public double LoginAtemptsFeature { get; set; }
        public string Country { get; set; }
        public double CountryFeature { get; set; }
        public decimal AmountEUR { get; set; }
        public double AmountEURFeature;
        public decimal ExchangeRate { get; set; }
        public double ExchangeRateFeature { get; set; }

        #region ClientRelated
        public string ClientCountry { get; set; }
        public double ClientCountryFeature { get; set; }
        public string LastTransactionDate { get; set; }
        public double LastTransactionDateFeature { get; set; }
        public decimal AmountOfSpentMoneyPerDay { get; set; }
        public double AmountOfSpentMoneyPerDayFeature { get; set; }
        public decimal AmountOfSpentMoneyPerMonth { get; set; }
        public double AmountOfSpentMoneyPerMonthFeature { get; set; }
        #endregion

        public DateTime InsertedTime { get; set; }
        public string Status { get; set; }
        public string StatusCode { get; set; }
        public double FraudProbability { get; set; }
    }
}
