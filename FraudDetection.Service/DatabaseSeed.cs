using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FraudDetection.Models;
namespace FraudDetection.Service
{
    public class DatabaseSeed : IDatabaseSeed
    {
        public List<CardTypeDTO> SeedCardType(bool insertDictionariesDb)
        {
            CardTypeDTO cardDebit = new CardTypeDTO()
            {
                Name = "Debit",
                CreatedAt = DateTime.Now,
                CardTypeId = 1
            };
            CardTypeDTO cardCredit = new CardTypeDTO()
            {
                Name = "Credit",
                CreatedAt = DateTime.Now,
                CardTypeId = 2
            };

            CardTypeDTO cardOther = new CardTypeDTO()
            {
                Name = "Other",
                CreatedAt = DateTime.Now,
                CardTypeId = 3
            };

            var lst = new List<CardTypeDTO>();
            lst.Add(cardCredit);
            lst.Add(cardDebit);
            lst.Add(cardOther);
            if (insertDictionariesDb)
            {
                var repo = new MDRepository<CardTypeDTO>("cardType");
                repo.InsertMany(lst);
            }
            return lst;
        }
        public List<TransactionTypeDTO> SeedTransactionType(bool insertDictionariesDb)
        {
            TransactionTypeDTO tranEcom = new TransactionTypeDTO()
            {
                Name = "E-Commerce",
                CreatedAt = DateTime.Now,
                TransactionTypeId = 1
            };
            TransactionTypeDTO tranATM = new TransactionTypeDTO()
            {
                Name = "ATM",
                CreatedAt = DateTime.Now,
                TransactionTypeId = 2
            };

            TransactionTypeDTO tranPOS = new TransactionTypeDTO()
            {
                Name = "POS",
                CreatedAt = DateTime.Now,
                TransactionTypeId = 3
            };

            var lst = new List<TransactionTypeDTO>();
            lst.Add(tranEcom);
            lst.Add(tranATM);
            lst.Add(tranPOS);
            if (insertDictionariesDb)
            {
                var repo = new MDRepository<TransactionTypeDTO>("transactionType");
                repo.InsertMany(lst);
            }
            return lst;
        }

        public List<TransactionStatus> SeedTransactionStatus(bool insertDictionariesDb)
        {
            TransactionStatus tranFraudAlert = new TransactionStatus()
            {
                Name = "Fraud Alert",
                Code = "ALERT",
                CreatedAt = DateTime.Now,
                Id = 1
            };

            TransactionStatus tranNonFraud = new TransactionStatus()
            {
                Name = "Non Fraud",
                Code = "NONFRAUD",
                CreatedAt = DateTime.Now,
                Id = 2
            };

            TransactionStatus tranClassifiedAsNonFraud = new TransactionStatus()
            {
                Name = "Classified as NonFraud",
                Code = "CLSNONFRAUD",
                CreatedAt = DateTime.Now,
                Id = 3
            };
            TransactionStatus tranClassifiedAsFraud = new TransactionStatus()
            {
                Name = "Classified as Fraud",
                Code = "CLSFRAUD",
                CreatedAt = DateTime.Now,
                Id = 4
            };


            var lst = new List<TransactionStatus>();
            lst.Add(tranFraudAlert);
            lst.Add(tranNonFraud);
            lst.Add(tranClassifiedAsFraud);
            lst.Add(tranClassifiedAsNonFraud);
            if (insertDictionariesDb)
            {
                var repo = new MDRepository<TransactionStatus>("transactionStatus");
                repo.InsertMany(lst);
            }
            return lst;
        }

        public List<CountryDTO> SeedTransactionCountries(bool insertDictionariesDb)
        {
            var step = 0.1;
            var featureValue = 0.0;
            CountryDTO c1 = new CountryDTO()
            {
                Name = "USA",
                CreatedAt = DateTime.Now,
                CountryId = 1
            };
            featureValue += step;
            CountryDTO c2 = new CountryDTO()
            {
                Name = "United Kingdom",
                CreatedAt = DateTime.Now,
                CountryId = 2
            };
            featureValue += step;
            CountryDTO c3 = new CountryDTO()
            {
                Name = "France",
                CreatedAt = DateTime.Now,
                CountryId = 3
            };
            featureValue += step;
            CountryDTO c4 = new CountryDTO()
            {
                Name = "Germany",
                CreatedAt = DateTime.Now,
                CountryId = 4
            };
            featureValue += step;
            CountryDTO c5 = new CountryDTO()
            {
                Name = "Romania",
                CreatedAt = DateTime.Now,
                CountryId = 5
            };
            featureValue += step;
            CountryDTO c6 = new CountryDTO()
            {
                Name = "China",
                CreatedAt = DateTime.Now,
                CountryId = 6
            };
            featureValue += step;
            CountryDTO c7 = new CountryDTO()
            {
                Name = "Australia",
                CreatedAt = DateTime.Now,
                CountryId = 7
            };
            featureValue += step;
            CountryDTO c8 = new CountryDTO()
            {
                Name = "Japan",
                CreatedAt = DateTime.Now,
                CountryId = 8
            };
            featureValue += step;
            CountryDTO c9 = new CountryDTO()
            {
                Name = "Brazil",
                CreatedAt = DateTime.Now,
                CountryId = 9
            };
            featureValue += step;
            CountryDTO c10 = new CountryDTO()
            {
                Name = "Spain",
                CreatedAt = DateTime.Now,
                CountryId = 10
            };


            var lst = new List<CountryDTO>();
            lst.Add(c1);
            lst.Add(c2);
            lst.Add(c3);
            lst.Add(c4);
            lst.Add(c5);
            lst.Add(c6);
            lst.Add(c7);
            lst.Add(c8);
            lst.Add(c9);
            lst.Add(c10);

            if (insertDictionariesDb)
            {
                var repo = new MDRepository<CountryDTO>("country");
                repo.InsertMany(lst);
            }
            return lst;
        }
    }

}
