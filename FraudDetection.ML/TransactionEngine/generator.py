import numpy as np
import pandas as pd
import datetime
from TransactionEngine import dictionaries

def generate_transactions(date, size=10000):

    df = pd.DataFrame()
    np.random.seed(date.toordinal())
    transaction_type_list, country_list, card_type_list, client_country, card_vendors = [],[],[],[], []
    merchant_code_list, card_start,card_end,login_atempts, longitute, latitude  = [],[],[],[],[],[]
    amount, transaction_time, card_expiry_date, last_trans_date , amount_per_day,y = [],[],[],[],[],[]
    card_types_proba = [card['Probability'] for card in dictionaries.CardTypes]
    trans_type_proba = [trans['Probability'] for trans in dictionaries.TransactionTypes]
    country_proba = [country['Probability'] for country in dictionaries.Countries]
    client_country_proba = [x['Probability'] for x in dictionaries.ClientCountries]


    for i in range(size):
        transaction_type_list.append(np.random.choice(np.arange(1,len(trans_type_proba)+1) ,p=trans_type_proba))
        country_list.append(np.random.choice(np.arange(1,len(country_proba)+1), p =country_proba))
        card_type_list.append(np.random.choice(np.arange(1, len(card_types_proba) + 1), p=card_types_proba))
        card_start.append(np.random.randint(3500,6000))
        card_end.append(np.random.randint(1000,9999))
        login_atempts.append(np.random.choice(np.arange(1,4), p =[0.8,0.1,0.1]))
        client_country.append(np.random.choice(np.arange(1,len(client_country_proba) + 1),p=client_country_proba))
        merchant_code_list.append(np.random.randint(1,11))
        longitute_min_max = next((x['Longitude'] for x in dictionaries.Countries if x['CountryId'] == country_list[-1]))
        latitude_min_max = next((x['Latitude'] for x in dictionaries.Countries if x['CountryId'] == country_list[-1]))
        longitute.append(np.random.uniform(low=longitute_min_max['Min'],high=longitute_min_max['Max']))
        latitude.append(np.random.uniform(low=latitude_min_max['Min'],high=latitude_min_max['Max']))
        amount.append(np.random.triangular(0,200,1500))
        amount_per_day.append(np.random.triangular(0,70,100))
        transaction_time.append(datetime.time(np.random.randint(0,24),np.random.randint(0,60),np.random.randint(0,60)))
        last_trans_date.append(date - datetime.timedelta(days=np.random.randint(0,30)))
        card_expiry_date.append(date + datetime.timedelta(days=np.random.randint(30,800)))
        card_vendors.append(next((x['CardVendorId'] for x in dictionaries.CardVendors if x['CardStart'] ==int(str(card_start[-1])[:1]))))
        y.append(np.random.choice(np.arange(0,2), p =[0.02,0.98]))

    df['Amount'] = amount
    df['CardVendorFeature'] = card_vendors
    df['LoginAtempts'] = login_atempts
    df['ClientCountryFeature'] = client_country
    df['TransactionTypeFeature'] = transaction_type_list
    df['Longitude'] = longitute
    df['Latitude'] = latitude
    df['CountryFeature'] = country_list
    df['AmountOfSpentMoneyPerDay'] = amount_per_day
    df['CardTypeFeature'] = card_type_list



    df['MerchantFeature'] = merchant_code_list
    df['CardStartFeature'] = card_start
    df['CardEndFeature'] = card_end
    df['CardExpiryDateFeature'] = card_expiry_date
    df['TransactionTimeFeature'] = transaction_time
    df['TransactionDateFeature'] = date
    df['LastTransactionDateFeature'] = last_trans_date
    df['AmountOfSpentMoneyPerMonth'] = df['AmountOfSpentMoneyPerDay'] * 30
    df['Class'] = y
    return df



