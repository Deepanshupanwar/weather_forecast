import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)

model11 = pickle.load(open('modelrandomtemp.pkl','rb'))
model12 = pickle.load(open('modelrandommax.pkl','rb'))
model13 = pickle.load(open('modelrandommin.pkl','rb'))
model14 = pickle.load(open('modelrandomhumid.pkl','rb'))
model21 = pickle.load(open('modeltreetemp.pkl','rb'))
model22 = pickle.load(open('modeltreemax.pkl','rb'))
model23 = pickle.load(open('modeltreemin.pkl','rb'))
model24 = pickle.load(open('modeltreehumid.pkl','rb'))
model31 = pickle.load(open('modellinetemp.pkl','rb'))
model32 = pickle.load(open('modellinemax.pkl','rb'))
model33 = pickle.load(open('modellinemin.pkl','rb'))
model34 = pickle.load(open('modellinehumid.pkl','rb'))

@app.route('/api',methods = ['GET','POST'])
def api():

    if request.method == 'GET':
        return "hello world"  
    if request.method == 'POST':
        response = request.get_json()
        print(response['main'])
        data = [[response['main']['temp_max'],response['main']['temp_min'],10,12,response['main']['humidity'],0,response['main']['pressure'],response['main']['temp'],response['wind']['speed']]]
        
        # Make prediction using model loaded from disk as per the data.
        prediction11 = model11.predict(data)
        prediction12 = model12.predict(data)
        prediction13 = model13.predict(data)
        prediction14 = model14.predict(data)
        prediction21 = model21.predict(data)
        prediction22 = model22.predict(data)
        prediction23 = model23.predict(data)
        prediction24 = model24.predict(data)
        prediction31 = model31.predict(data)
        prediction32 = model32.predict(data)
        prediction33 = model33.predict(data)
        prediction34 = model34.predict(data)
        # Take the first value of prediction
        output11 = prediction11[0]
        output12 = prediction12[0]
        output13 = prediction13[0]
        output14 = prediction14[0]
        output21 = prediction21[0]
        output22 = prediction22[0]
        output23 = prediction23[0]
        output24 = prediction24[0]
        output31 = prediction31[0]
        output32 = prediction32[0]
        output33 = prediction33[0]
        output34 = prediction34[0]
        return {"temp":[output11,output21,output31],"max_temp":[output12,output22,output32],"min_temp":[output13,output23,output33],"humidity":[output14,output24,output34]}
if __name__ == '__main__':
    try:
        app.run(debug=True)
    except:
        print("Server is exited unexpectedly. Please contact server admin.")
