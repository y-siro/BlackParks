import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from datetime import datetime


def send2db(layer):
    cred = credentials.Certificate("C:/Users/leebj/PycharmProjects/pythonProject/serviceAccountKey.json")
    firebase_admin.initialize_app(cred, {'databaseURL':'firebase-adminsdk-qpd7n@blackparks4-7a885.iam.gserviceaccount.com'})
    db = firestore.client()

    # 시간 지정
    now = datetime.now()
    year = now.year
    month = now.month
    day = now.day
    day_list = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일']
    day2 = day_list[now.today().weekday()]
    hour = now.hour
    minute = now.minute
    halftime = None
    if hour >= 12 :
        halftime = '오후'
        if hour > 12:
            hour -= 12
    else:
        halftime = '오전'
    current_time = str(year)+"년 "+str(month)+"월 "+str(day)+"일 "+ day2+" "+halftime+" "+ str(hour)+":"+str(minute)

    # 데이터 전송
    doc_ref = db.collection(u'time').document(u'kuromi')
    doc_ref.set({
        u'time': str(current_time),
    })
    doc_ref = db.collection(u'location').document(u'QhyHZBPdz52rkAElYGbi')
    doc_ref.set({
        u'floor': str(layer),
    })
