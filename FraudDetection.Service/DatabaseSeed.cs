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
                Feature = 0,
                FraudProbability = 0.2,
                AprearenceProbability = 0.4,
                CreatedAt = DateTime.Now,
                Id = 1
            };
            CardTypeDTO cardCredit = new CardTypeDTO()
            {
                Name = "Credit",
                Feature = 0.3,
                FraudProbability = 0.1,
                AprearenceProbability = 0.5,
                CreatedAt = DateTime.Now,
                Id = 2
            };

            CardTypeDTO cardOther = new CardTypeDTO()
            {
                Name = "Other",
                Feature = 0.6,
                FraudProbability = 0.1,
                AprearenceProbability = 0.1,
                CreatedAt = DateTime.Now,
                Id = 3
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
                Feature = 0,
                FraudProbability = 0.2,
                AprearenceProbability = 0.4,
                CreatedAt = DateTime.Now,
                Id = 1
            };
            TransactionTypeDTO tranATM = new TransactionTypeDTO()
            {
                Name = "ATM",
                Feature = 0.3,
                FraudProbability = 0.1,
                AprearenceProbability = 0.5,
                CreatedAt = DateTime.Now,
                Id = 2
            };

            TransactionTypeDTO tranPOS = new TransactionTypeDTO()
            {
                Name = "POS",
                Feature = 0.6,
                FraudProbability = 0.1,
                AprearenceProbability = 0.1,
                CreatedAt = DateTime.Now,
                Id = 3
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

        public List<TransactionStatusDTO> SeedTransactionStatus(bool insertDictionariesDb)
        {
            TransactionStatusDTO tranFraudAlert = new TransactionStatusDTO()
            {
                Name = "Fraud Alert",
                Code = "ALERT",
                CreatedAt = DateTime.Now,
                Id = 1
            };

            TransactionStatusDTO tranNonFraud = new TransactionStatusDTO()
            {
                Name = "Non Fraud",
                Code = "NONFRAUD",
                CreatedAt = DateTime.Now,
                Id = 2
            };

            TransactionStatusDTO tranClassifiedAsNonFraud = new TransactionStatusDTO()
            {
                Name = "Classified as NonFraud",
                Code = "CLSNONFRAUD",
                CreatedAt = DateTime.Now,
                Id = 3
            };
            TransactionStatusDTO tranClassifiedAsFraud = new TransactionStatusDTO()
            {
                Name = "Classified as Fraud",
                Code = "CLSFRAUD",
                CreatedAt = DateTime.Now,
                Id = 4
            };


            var lst = new List<TransactionStatusDTO>();
            lst.Add(tranFraudAlert);
            lst.Add(tranNonFraud);
            lst.Add(tranClassifiedAsFraud);
            lst.Add(tranClassifiedAsNonFraud);
            if (insertDictionariesDb)
            {
                var repo = new MDRepository<TransactionStatusDTO>("transactionStatus");
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
                Feature = featureValue,
                FraudProbability = 0.1,
                AprearenceProbability = 0.1,
                CreatedAt = DateTime.Now,
                Id = 1
            };
            featureValue += step;
            CountryDTO c2 = new CountryDTO()
            {
                Name = "United Kingdom",
                Feature = featureValue,
                FraudProbability = 0.1,
                AprearenceProbability = 0.1,
                CreatedAt = DateTime.Now,
                Id = 2
            };
            featureValue += step;
            CountryDTO c3 = new CountryDTO()
            {
                Name = "France",
                Feature = featureValue,
                FraudProbability = 0.1,
                AprearenceProbability = 0.1,
                CreatedAt = DateTime.Now,
                Id = 3
            };
            featureValue += step;
            CountryDTO c4 = new CountryDTO()
            {
                Name = "Germany",
                Feature = featureValue,
                FraudProbability = 0.1,
                AprearenceProbability = 0.1,
                CreatedAt = DateTime.Now,
                Id = 4
            };
            featureValue += step;
            CountryDTO c5 = new CountryDTO()
            {
                Name = "Romania",
                Feature = featureValue,
                FraudProbability = 0.1,
                AprearenceProbability = 0.1,
                CreatedAt = DateTime.Now,
                Id = 5
            };
            featureValue += step;
            CountryDTO c6 = new CountryDTO()
            {
                Name = "China",
                Feature = featureValue,
                FraudProbability = 0.5,
                AprearenceProbability = 0.1,
                CreatedAt = DateTime.Now,
                Id = 6
            };
            featureValue += step;
            CountryDTO c7 = new CountryDTO()
            {
                Name = "Australia",
                Feature = featureValue,
                FraudProbability = 0.1,
                AprearenceProbability = 0.1,
                CreatedAt = DateTime.Now,
                Id = 7
            };
            featureValue += step;
            CountryDTO c8 = new CountryDTO()
            {
                Name = "Japan",
                Feature = featureValue,
                FraudProbability = 0.1,
                AprearenceProbability = 0.1,
                CreatedAt = DateTime.Now,
                Id = 8
            };
            featureValue += step;
            CountryDTO c9 = new CountryDTO()
            {
                Name = "Brazil",
                Feature = featureValue,
                FraudProbability = 0.1,
                AprearenceProbability = 0.1,
                CreatedAt = DateTime.Now,
                Id = 9
            };
            featureValue += step;
            CountryDTO c10 = new CountryDTO()
            {
                Name = "Spain",
                Feature = featureValue,
                FraudProbability = 0.1,
                AprearenceProbability = 0.1,
                CreatedAt = DateTime.Now,
                Id = 10
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
