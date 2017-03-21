from sklearn.ensemble import RandomForestClassifier


class RFClassificationModel(object):
    def __init__(self,reg_model=None):
        self.reg_model = RandomForestClassifier(n_estimators=100,n_jobs=2)

    def Train(self,x,y):
        self.reg_model.fit(x,y)

    def GetClassifier(self):
        return self.reg_model

    def GetFeatureImportances(self):
        return self.reg_model.feature_importances_
