from flask import Flask, request, jsonify
from pymongo import MongoClient
from datetime import datetime
import os

app = Flask(__name__)

# Set your MONGO_URI env in kthcloud
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client.get_default_database()
messages = db.get_collection("messages")


@app.route("/healthz")
def healthz():
    return "ok", 200


@app.route("/create", methods=["POST"])
def create():
    message = request.get_json().get("message")
    messages.insert_one({"message": message, "timestamp": datetime.utcnow()})
    return jsonify({"status": "success"}), 201


@app.route("/")
def get_messages():
    messages_list = list(messages.find().sort("timestamp", -1))
    for message in messages_list:
        message["_id"] = str(message["_id"])
    return jsonify(messages_list), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
