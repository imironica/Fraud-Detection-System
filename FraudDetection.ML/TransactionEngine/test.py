from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from TransactionEngine import generator
import pandas as pd
import datetime
from sklearn import metrics


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


def prepare_df(df):
    df['TransactionDateDay'] = df['TransactionDate'].map(extract_day)
    df['TransactionDateMonth'] = df['TransactionDate'].map(extract_month)
    df['CardExpiryMonth'] = df['CardExpiryDate'].map(extract_month)
    df['CardExpiryYear'] = df['CardExpiryDate'].map(extract_year)
    df['LastTransDay'] = df['LastTransactionDate'].map(extract_day)
    df['LastTransMonth'] = df['LastTransactionDate'].map(extract_month)
    df['TransTimeHour'] = df['TransactionTime'].map(extract_hour)
    df['TransTimeMinute'] = df['TransactionTime'].map(extract_minute)
    df.drop(['TransactionDate','CardExpiryDate','LastTransactionDate','TransactionTime'],axis=1,inplace=True)
    return df





df = generator.generate_transactions(datetime.date.today(),size=100000)
df = prepare_df(df)

fraud = df[df['Class'] == 0]
normal = df[df['Class'] == 1]

cc_data = fraud.append(normal)
print ("Percentage of normal transactions                 :", len(normal) / float(len(cc_data)))
print ("Percentage of fraudulent trasactions                :", len(fraud) / float(len(cc_data)))
print ("Total number of transactions in our new dataset :", len(cc_data))

#Random forest
reg_model = RandomForestClassifier()
train_data,test_data = train_test_split(cc_data,test_size=0.2)
y = train_data['Class']
x = train_data.drop(['Class'],axis=1)

reg_model.fit(x,y)

test_x = test_data.drop(['Class'],axis=1)
test_y = test_data['Class']

predicted = reg_model.predict(test_x)


print(metrics.classification_report(test_y, predicted))
print(metrics.confusion_matrix(test_y, predicted))
false_positive_rate, true_positive_rate, thresholds = metrics.roc_curve(test_y, predicted)
roc_auc = metrics.auc(false_positive_rate, true_positive_rate)
print('AUC = %0.4f'% roc_auc)

