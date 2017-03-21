import os, sys
sys.path.append(os.path.dirname(__file__))
from TransactionEngine import dictionaries,generator
import pandas as pd
from pymongo import MongoClient
from AI import main
import datetime


def insert_dictionaries():
    global db
    db.countries.insert(dictionaries.countries)
    db.transaction_types.insert(dictionaries.transaction_types)
    db.card_types.insert(dictionaries.card_types)
    db.client_countries.insert(dictionaries.client_contries)
    db.card_vendors.insert(dictionaries.card_vendors)

def save_model():
    main.save_model_to_disk()

def generate_initial_transactions():
    global db
    test_df = pd.DataFrame()
    dates = pd.date_range('2017-03-01' ,datetime.date.today())
    for date in dates:
        temp_df = generator.generate_transactions(date,size=3000)
        test_df = test_df.append(temp_df,ignore_index=True)
    prediction = main.return_prediction(test_df)
    trans_list = prediction.reset_index().to_dict('records')
    db.transactions.insert_many(trans_list)

def wipe_collections():
    global db
    db.drop_collection('card_types')
    db.drop_collection('transactions')
    db.drop_collection('countries')
    db.drop_collection('transaction_types')
    db.drop_collection('card_vendors')
    db.drop_collection('client_countries')

def start_up():
    global db
    save_model()
    insert_dictionaries()
    generate_initial_transactions()
    return  db.collection_names()

if __name__ == '__main__':

    client = MongoClient()
    db = client.local
    wipe_collections()
    print(start_up())

