import json
import flask
from flask_cors import CORS
from flask_sock import Sock

app = flask.Flask(__name__)
CORS(app)
sock = Sock(app)

import random
import threading
import time


def random_number_emitter(ws):
    """Emit a random number every second."""
    while True:
        number = random.randint(1, 100)
        ws.send(number)
        time.sleep(1)


@app.route("/")
def index():
    return "OK", 200


@app.route("/healthz")
def health_check():
    return "OK", 200


@sock.route("/test")
def test(ws):
    threading.Thread(target=random_number_emitter(ws), daemon=True).start()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
