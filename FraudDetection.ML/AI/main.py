from AI import helper_methods,classifican_models
from TransactionEngine import generator
from sklearn import metrics
import pandas as pd
import datetime
import pickle


def save_model_to_disk():
    train_df = generator.generate_transactions(datetime.date.today(),size=100000)
    train_df = helper_methods.prepare_df_for_classification(train_df)
    y = train_df['Class']
    x = train_df.drop(['Class'], axis=1)
    cls = classifican_models.RFClassificationModel()
    cls.Train(x,y)
    reg_model = cls.GetClassifier()
    with open('model.pkl', 'wb') as f:
        pickle.dump(reg_model,f)

def load_model_from_disk():
    with open('model.pkl', 'rb') as f:
        model = pickle.load(f)
    return model

def return_prediction(df):
    model = load_model_from_disk()
    test_data = df.drop(['Class'],axis =1)
    test_data = helper_methods.prepare_df_for_classification(test_data)
    prediction = model.predict(test_data)
    prediction_proba = model.predict_proba(test_data)
    df['Prediction'] = prediction
    df['FraudProbability'] = prediction_proba[:,0]
    df = helper_methods.format_df_for_db(df)
    return df



