from TransactionEngine import dictionaries
import datetime
def extract_day(date):
    return date.day
def extract_month(date):
    return date.month
def extract_year(date):
    return date.year
def extract_hour(time):
    return time.hour
def extract_minute(time):
    return time.minute

def prepare_df_for_classification(df):
    df['TransactionDateDay'] = df['TransactionDateFeature'].map(extract_day)
    df['TransactionDateMonth'] = df['TransactionDateFeature'].map(extract_month)
    df['CardExpiryMonth'] = df['CardExpiryDateFeature'].map(extract_month)
    df['CardExpiryYear'] = df['CardExpiryDateFeature'].map(extract_year)
    df['LastTransDay'] = df['LastTransactionDateFeature'].map(extract_day)
    df['LastTransMonth'] = df['LastTransactionDateFeature'].map(extract_month)
    df['TransTimeHour'] = df['TransactionTimeFeature'].map(extract_hour)
    df['TransTimeMinute'] = df['TransactionTimeFeature'].map(extract_minute)
    df.drop(['TransactionDateFeature','CardExpiryDateFeature','LastTransactionDateFeature','TransactionTimeFeature'],axis=1,inplace=True)
    return df

def format_df_for_db(df):
    def combine_date_time(date,time):
        return datetime.datetime.combine(date,time)
    def combine_card_numbers(start , end):
        return "{}********{}".format(start,end)
    def extract_merchant(country, merchant):
        return  next(y['name'] for y in next(x['merchants'] for x in dictionaries.countries if x['countryId'] == country) if y['id']==merchant)

    df['TransactionDateTimeFeature'] = df[['TransactionDateFeature','TransactionTimeFeature']].apply(lambda x: combine_date_time(*x), axis=1)
    df.drop(['TransactionDateFeature','TransactionTimeFeature'],axis=1,inplace=True)
    df['TransactionDate'] = df['TransactionDateTimeFeature'].map(lambda x: x.strftime('%d/%m/%Y'))
    df['TransactionTime'] = df['TransactionDateTimeFeature'].map(lambda x: x.strftime('%H:%M:%S'))
    df['CardExpiryDate'] = df['CardExpiryDateFeature'].map(lambda x: x.strftime('%m/%Y'))
    df['LastTransactionDate'] = df['LastTransactionDateFeature'].map(lambda x : x.strftime('%d/%m/%Y'))
    df['CardNumber'] = df[['CardStartFeature','CardEndFeature']].apply(lambda x:combine_card_numbers(*x),axis=1)
    df['Country'] = df['CountryFeature'].map(lambda x: next(c['name'] for c in dictionaries.countries if c['countryId']==x))
    df['ClientCountry'] = df['ClientCountryFeature'].map(lambda x: next(c['name'] for c in dictionaries.client_contries if c['clientCountryId']==x))
    df['CardType'] = df['CardTypeFeature'].map(lambda x: next(c['name'] for c in dictionaries.card_types if c['cardTypeId']==x))
    df['CardVendor'] = df['CardVendorFeature'].map(lambda x: next(c['name'] for c in dictionaries.card_vendors if c['cardVendorId']==x))
    df['TransactionType'] = df['TransactionTypeFeature'].map(lambda x: next(c['name'] for c in dictionaries.transaction_types if c['transactionTypeId']==x))
    df['Merchant'] = df[['CountryFeature','MerchantFeature']].apply(lambda x: extract_merchant(*x), axis=1)
    df['InsertedTime'] = datetime.datetime.now()
    return df
