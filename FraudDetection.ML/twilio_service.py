
from twilio.rest import TwilioRestClient

ACCOUNT_SID = "AC870229440ec39ecb640816ae138a280a"
AUTH_TOKEN = "a5bef2ebc9971e020f91f8e32274fe62"

client = TwilioRestClient(ACCOUNT_SID, AUTH_TOKEN)
def send_alert_message(merchant,amount,otp):


    message = client.messages.create(
    to="+40724391554",
    from_="+12056832624",
    body="Transaction at {} with amount of {} needs your approval, in order to be processed. Please visit url http://verify.com/ and confirm with the code {}"
        .format(merchant,amount,otp),
    )

    return message.sid

