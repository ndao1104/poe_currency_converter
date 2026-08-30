import requests
from flask import Flask, render_template, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/leagues")
def get_leagues():
    response = requests.get("https://poe.ninja/poe1/api/economy/leagues")
    data = response.json()
    return jsonify(data)

@app.route("/api/currency")
def get_currency():
    league = "Allflame"
    response = requests.get(f"https://poe.ninja/poe1/api/economy/stash/current/currency/overview?league={league}&type=Currency")
    data = response.json()
    return jsonify(data)
    
@app.route("/api/cards")
def get_cards():
    league = "Allflame"
    response = requests.get(f"https://poe.ninja/poe1/api/economy/exchange/current/overview?league={league}&type=DivinationCard")
    data = response.json()
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)