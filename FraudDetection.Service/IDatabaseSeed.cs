﻿using System.Collections.Generic;
using FraudDetection.Models;

namespace FraudDetection.Service
{
    public interface IDatabaseSeed
    {
        List<CardTypeDTO> SeedCardType(bool insertDictionariesDb);
        List<TransactionStatusDTO> SeedTransactionStatus(bool insertDictionariesDb);
        List<TransactionTypeDTO> SeedTransactionType(bool insertDictionariesDb);
    }
}