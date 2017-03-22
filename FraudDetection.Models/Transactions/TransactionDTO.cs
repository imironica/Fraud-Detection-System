using FraudDetection.Models.Transactions;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace FraudDetection.Models
{
    [BsonIgnoreExtraElements]
    public class TransactionDTO : Entity
    {
        public TransactionDTO()
        {
        }
        public object _id { get; set; }
        public int TransactionID { get; set; }
        public string TransactionType { get; set; }
        public int TransactionTypeFeature { get; set; }
        public double Amount { get; set; }
        public string CardNumber { get; set; }
        public double CardNumberFeature { get; set; }
        public string CardExpiryDate { get; set; }
        public DateTime CardExpiryDateFeature { get; set; }
        public int CardStartFeature { get; set; }
        public int CardEndFeature { get; set; }
        public string CardType { get; set; }
        public string CardVendor { get; set; }
        public int CardVendorFeature { get; set; }
        public int CardTypeFeature { get; set; }
        public string TransactionDate { get; set; }
        public string TransactionTime { get; set; }
        public DateTime TransactionDateTimeFeature { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        public int LoginAtempts { get; set; }
        public string Country { get; set; }
        public double CountryFeature { get; set; }
        public string Merchant { get; set; }
        public double MerchantFeature { get; set; }

        #region ClientRelated
        //public ClientCountryDTO ClientCountry { get; set; }
        public string ClientCountry { get; set; }
        public int ClientCountryFeature { get; set; }
        public string LastTransactionDate { get; set; }
        public DateTime LastTransactionDateFeature { get; set; }
        public double AmountOfSpentMoneyPerDay { get; set; }
        public double AmountOfSpentMoneyPerMonth { get; set; }
        #endregion

        public int Prediction { get; set; } // 1-nonfraud; 0-fraud (predicted)
        public int Class { get; set; } // 1-nonfraud; 0-fraud
        public double FraudProbability { get; set; } // [0.1]
        public bool Verified { get; set; }
    }
}
