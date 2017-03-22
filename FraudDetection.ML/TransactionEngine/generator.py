import numpy as np
import pandas as pd
import datetime
from TransactionEngine import dictionaries

def generate_transactions(date, size=10000):

    df = pd.DataFrame()
    np.random.seed(date.toordinal())
    transaction_type_list, country_list, card_type_list, client_country, card_vendors = [],[],[],[], []
    merchant_code_list, card_start,card_end,login_atempts, longitute, latitude  = [],[],[],[],[],[]
    amount, transaction_time, card_expiry_date, last_trans_date , amount_per_day,x = [],[],[],[],[],[]
    card_types_proba = [card['probability'] for card in dictionaries.card_types]
    trans_type_proba = [trans['probability'] for trans in dictionaries.transaction_types]
    county_proba = [country['probability'] for country in dictionaries.countries]
    client_country_proba = [x['probability'] for x in dictionaries.client_contries]


    for i in range(size):
        transaction_type_list.append(np.random.choice(np.arange(1,len(trans_type_proba)+1) ,p=trans_type_proba))
        country_list.append(np.random.choice(np.arange(1,len(county_proba)+1), p =county_proba))
        card_type_list.append(np.random.choice(np.arange(1, len(card_types_proba) + 1), p=card_types_proba))
        card_start.append(np.random.randint(3500,6000))
        card_end.append(np.random.randint(1000,9999))
        login_atempts.append(np.random.choice(np.arange(1,4), p =[0.8,0.1,0.1]))
        client_country.append(np.random.choice(np.arange(1,len(client_country_proba) + 1),p=client_country_proba))
        merchant_code_list.append(np.random.randint(1,11))
        longitute_min_max = next((x['longitude'] for x in dictionaries.countries if x['countryId'] == country_list[-1]))
        latitude_min_max = next((x['latitude'] for x in dictionaries.countries if x['countryId'] == country_list[-1]))
        longitute.append(np.random.uniform(low=longitute_min_max['min'],high=longitute_min_max['max']))
        latitude.append(np.random.uniform(low=latitude_min_max['min'],high=latitude_min_max['max']))
        amount.append(np.random.triangular(0,200,1500))
        amount_per_day.append(np.random.triangular(0,70,100))
        transaction_time.append(datetime.time(np.random.randint(0,24),np.random.randint(0,60),np.random.randint(0,60)))
        last_trans_date.append(date - datetime.timedelta(days=np.random.randint(0,30)))
        card_expiry_date.append(date + datetime.timedelta(days=np.random.randint(30,800)))
        card_vendors.append(next((x['cardVendorId'] for x in dictionaries.card_vendors if x['cardstart'] ==int(str(card_start[-1])[:1]))))

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

    y = []
    for row in df.values:
        row_tmp = list()
        for i in range(0, len(row)):
            row_tmp.append(row[i] * 2. - 1)
            row_tmp[i] = (np.tanh(row_tmp[i])) * (i + 1)
        output = np.sin(np.mean(row_tmp))
        classnum = 0
        classranges = [0, -1]
        for i in classranges:
            if (output >= i):
                y.append(classnum)
                break
            classnum = classnum + 1
    y = np.asarray(y)
    df['CardStartFeature'] = card_start
    df['CardEndFeature'] = card_end
    df['TransactionTimeFeature'] = transaction_time
    df['CardExpiryDateFeature'] = card_expiry_date
    df['TransactionDateFeature'] = date
    df['LastTransactionDateFeature'] = last_trans_date
    df['AmountOfSpentMoneyPerMonth'] = df['AmountOfSpentMoneyPerDay'] * 30
    df['Class'] = y
    return df



