from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient(
    'mongodb+srv://sinayaka_body:qvSKCgOe5BZD34GE@cluster0.2i935is.mongodb.net/?retryWrites=true&w=majority')
db = client.dbsparta

@app.route('/')
def home():
   return render_template('index.html')
    
@app.route("/get_data", methods=["GET"])
def get_data():
    phase = request.args.get('phase', '')
    sales = request.args.get('sales', '')
    product = request.args.get('product', '')
    # Find all data that has all the tags
    comments_with_tag = list(db.knowhow.find({"tag": {'$all': [phase, sales, product]}}, {'_id': False}))
    return jsonify({'result': comments_with_tag})



if __name__ == '__main__':
   app.run('0.0.0.0', port=5001, debug=True)
