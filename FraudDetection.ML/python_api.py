from flask import Flask , jsonify , request,abort
from AI import main
import pandas as pd
import numpy as np
import datetime
import twilio_service
from pymongo import MongoClient
app = Flask(__name__)


@app.route('/verify', methods=['POST'])
def get_probability():
    if not request.json:
        abort(400)

    df= pd.DataFrame(columns=["Amount","CardVendorFeature","LoginAtempts","ClientCountryFeature",
                              'TransactionTypeFeature','Longitude','Latitude','CountryFeature',
                              'AmountOfSpentMoneyPerDay','CardTypeFeature','MerchantFeature',
                              'CardStartFeature','CardEndFeature','CardExpiryDateFeature',
                            'LastTransactionDateFeature','AmountOfSpentMoneyPerMonth','Class'],

                     data=[[request.json['Amount'],request.json['CardVendorFeature'],request.json['LoginAtempts'],
                            request.json['ClientCountryFeature'],request.json['TransactionTypeFeature'],
                            request.json['Longitude'],request.json['Latitude'],request.json['CountryFeature'],
                            request.json['AmountOfSpentMoneyPerDay'],request.json['CardTypeFeature'],request.json['MerchantFeature'],
                            request.json['CardStartFeature'],request.json['CardEndFeature'],
                            request.json['CardExpiryDateFeature'],request.json['LastTransactionDateFeature'],
                            request.json['AmountOfSpentMoneyPerMonth'],request.json['Class']]])


    df['LastTransactionDateFeature'] = datetime.date.today() - datetime.timedelta(days=4)
    df['CardExpiryDateFeature'] = df['CardExpiryDateFeature'].map(np.datetime64)
    df['TransactionTimeFeature'] = datetime.time()
    df['TransactionDateFeature'] = datetime.date.today()

    df = df[["Amount","CardVendorFeature","LoginAtempts","ClientCountryFeature",
                              'TransactionTypeFeature','Longitude','Latitude','CountryFeature',
                              'AmountOfSpentMoneyPerDay','CardTypeFeature','MerchantFeature',
                              'CardStartFeature','CardEndFeature','CardExpiryDateFeature',
                              'TransactionTimeFeature','TransactionDateFeature','LastTransactionDateFeature','AmountOfSpentMoneyPerMonth','Class']]



    df= main.return_prediction(df)
    df['LastTransactionDateFeature'] = df['LastTransactionDateFeature'].astype('datetime64')
    fraudProbability = df['FraudProbability'][0]
    client = MongoClient()
    db = client.FraudDetection
    df['TransactionId'] = db.Transactions.find_one(sort=[("TransactionId", -1)])["TransactionId"] +1
    df['SmsCode'] = np.random.randint(100001,999999)
    trans = df.to_dict('records')
    db.Transactions.insert(trans)
    print(fraudProbability)

    if fraudProbability > 0.3:
        #twilio_service.send_alert_message(df['Merchant'][0],df['Amount'][0],df['SmsCode'][0])
        print(df['SmsCode'][0])
    return jsonify({'fraudProbability': fraudProbability})




if __name__ == '__main__':
    app.run(debug=True)