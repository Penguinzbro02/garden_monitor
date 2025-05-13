import os
import json
import requests
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

# -----------------------------------------------------------------------------
# App setup + CORS
# -----------------------------------------------------------------------------
app = Flask(__name__)
CORS(app)                                    # allow requests from http://localhost:3000

DATA_DIR   = os.path.abspath("../data")      # one place for the data folder
LOGS_FILE  = os.path.join(DATA_DIR, "logs.json")
PLANTS_FILE= os.path.join(DATA_DIR, "plants_data.json")

# Load secrets from secrets.json
SECRETS_FILE = os.path.abspath("secrets.json")
try:
    with open(SECRETS_FILE, "r") as f:
        secrets = json.load(f)
        TREFLE_API_KEY = secrets.get("TREFLE_KEY", "INSERT KEY HERE")
except (FileNotFoundError, json.JSONDecodeError):
    TREFLE_API_KEY = "INSERT KEY HERE"  # Fallback if secrets.json is missing or invalid


# -----------------------------------------------------------------------------
# NEW  ➜  CORS-safe proxy to Trefle
# -----------------------------------------------------------------------------
@app.route('/api/plants')
def plants_proxy():
    query = request.args.get('q', '')
    url = f"https://trefle.io/api/v1/plants/search?q={query}&token={TREFLE_API_KEY}"
    try:
        response = requests.get(url, timeout=10)
        return jsonify(response.json()), response.status_code
    except requests.RequestException as e:
        return jsonify({"error": str(e)}), 502


# -----------------------------------------------------------------------------
# Statistics endpoint (unchanged)
# -----------------------------------------------------------------------------
@app.route("/api/statistics", methods=["GET"])
def get_statistics():
    with open(PLANTS_FILE, "r") as f:
        plants = json.load(f)

    stats = {
        "total_plants": len(plants),
        "families": {},
        "genera": {},
        "authors": {},
        "years": [],
        "sample_plants": []
    }

    for plant in plants:
        stats["families"][plant.get("family", "Unknown")]  = stats["families"].get(plant.get("family",  "Unknown"), 0) + 1
        stats["genera"] [plant.get("genus",  "Unknown")]   = stats["genera"] .get(plant.get("genus",   "Unknown"), 0) + 1
        stats["authors"][plant.get("author", "Unknown")]   = stats["authors"].get(plant.get("author",  "Unknown"), 0) + 1
        if "year" in plant:
            stats["years"].append(plant["year"])

    stats["earliest_year"] = min(stats["years"]) if stats["years"] else None
    stats["latest_year"]   = max(stats["years"]) if stats["years"] else None
    stats.pop("years", None)

    stats["sample_plants"] = [
        {"name": p.get("common_name", "Unknown"), "image_url": p.get("image_url", "")}
        for p in plants[:10]
    ]
    return jsonify(stats)


# -----------------------------------------------------------------------------
# Save a new log entry
# -----------------------------------------------------------------------------
@app.route("/api/save-log", methods=["POST"])
def save_log():
    try:
        new_log      = request.json
        reversed_log = {k: new_log[k] for k in reversed(new_log)}

        try:
            with open(LOGS_FILE, "r") as f:
                logs = json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            logs = []

        logs.append(reversed_log)

        with open(LOGS_FILE, "w") as f:
            json.dump(logs, f, indent=4)

        return jsonify({"message": "Log saved successfully!"}), 200
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


# -----------------------------------------------------------------------------
# Serve raw data files from ../data
# -----------------------------------------------------------------------------
@app.route("/data/<path:filename>")
def data_files(filename):
    return send_from_directory(DATA_DIR, filename)


# -----------------------------------------------------------------------------
# Handle 404 errors
# -----------------------------------------------------------------------------
@app.errorhandler(404)
def page_not_found(_):
    return "Error: Page not found", 404

# ----------------------------------------------------------------------------- 
# Main Entry Point
# -----------------------------------------------------------------------------
if __name__ == "__main__":
    # Uses http://127.0.0.1:5000 by default
    app.run(debug=True)