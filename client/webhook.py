import os
import uuid
import requests
from dotenv import load_dotenv
from flask import Flask, request, make_response, json

@app.route("/webhook", methods=["GET"])
def webhook_get():
    if (
        request.args.get("hub.mode") == "subscribe"
        and request.args.get("hub.verify_token") == VERIFY_TOKEN
    ):
        return make_response(request.args.get("hub.challenge"), 200)
    else:
        return make_response("Success", 403)