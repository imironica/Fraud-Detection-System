import os, sys
sys.path.append(os.path.dirname(__file__))
from TransactionEngine import dictionaries,generator
import pandas as pd
from pymongo import MongoClient
from AI import main
import datetime
import numpy as np



def insert_dictionaries():
    global db
    db.Countries.insert(dictionaries.Countries)
    db.TransactionTypes.insert(dictionaries.TransactionTypes)
    db.CardTypes.insert(dictionaries.CardTypes)
    db.ClientCountries.insert(dictionaries.ClientCountries)
    db.CardVendors.insert(dictionaries.CardVendors)

def save_model():
    main.save_model_to_disk()

def generate_initial_transactions():
    global db
    test_df = pd.DataFrame()
    dates = pd.date_range('2017-01-01' ,datetime.date.today())
    for date in dates:
        temp_df = generator.generate_transactions(date,size=np.random.randint(700,1433))
        test_df = test_df.append(temp_df,ignore_index=True)

    prediction = main.return_prediction(test_df)
    prediction = prediction.reset_index().rename(columns={'index':'TransactionId'})
    prediction['Verified'] = True
    trans_list = prediction.to_dict('records')
    db.Transactions.insert_many(trans_list)


def generate_transaction_for_today():
    global db, last_id
    test_df = pd.DataFrame()
    dates = pd.date_range('2017-03-26' ,'2017-03-26')
    for date in dates:
        temp_df = generator.generate_transactions(date,size=344)
        test_df = test_df.append(temp_df,ignore_index=True)

    prediction = main.return_prediction(test_df)
    prediction = prediction.reset_index().rename(columns={'index':'TransactionId'})
    prediction['Verified'] = False
    prediction['TransactionId'] = prediction['TransactionId'] + last_id
    print(prediction.tail())
    trans_list = prediction.to_dict('records')
    db.Transactions.insert_many(trans_list)

def wipe_collections():
    global db
    db.drop_collection('CardTypes')
    db.drop_collection('Transactions')
    db.drop_collection('Countries')
    db.drop_collection('TransactionTypes')
    db.drop_collection('CardVendors')
    db.drop_collection('ClientCountries')

def start_up():
    global db, last_id
    save_model()
    insert_dictionaries()
    generate_initial_transactions()
    last_id = db.Transactions.find_one(sort=[("TransactionId", -1)])["TransactionId"]
    generate_transaction_for_today()


    return  db.collection_names()

if __name__ == '__main__':
    last_id = 0
    client = MongoClient()
    db = client.FraudDetection
    wipe_collections()
    print("Done adding colections: {} to db".format(start_up()))

