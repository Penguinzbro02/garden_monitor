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

DATA_DIR   = os.path.abspath("./data")      # one place for the data folder
LOGS_FILE  = os.path.join(DATA_DIR, "logs.json")
PLANTS_FILE= os.path.join(DATA_DIR, "plants_data.json")

# Load secrets from secrets.json
SECRETS_FILE = os.path.abspath("backend/secrets.json")
try:
    with open(SECRETS_FILE, "r") as f:
        secrets = json.load(f)
        TREFLE_API_KEY = secrets.get("TREFLE_KEY")
        if not TREFLE_API_KEY:
            raise ValueError("TREFLE_KEY is missing")
except FileNotFoundError:
    raise FileNotFoundError(f"Secrets file not found at {SECRETS_FILE}.")
except json.JSONDecodeError:
    raise ValueError(f"Secrets file {SECRETS_FILE} is not a valid JSON file.")

# -----------------------------------------------------------------------------
# NEW  ➜  CORS-safe proxy to Trefle
# -----------------------------------------------------------------------------
@app.route('/api/plants')
def proxy_trefle():
    query = request.args.get('q', '')
    url = f"https://trefle.io/api/v1/plants?q={query}&token={TREFLE_API_KEY}"
    print(f"[DEBUG] Calling: {url}")

    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.RequestException as e:
        print(f"[ERROR] Trefle request failed: {e}")
        return jsonify({"error": str(e)}), 502


# -----------------------------------------------------------------------------
# Statistics endpoint
# -----------------------------------------------------------------------------
@app.route("/api/statistics", methods=["GET"])
def get_statistics():
    with open(PLANTS_FILE, "r") as f:
        plants = json.load(f)

    # Initialize statistics
    stats = {
        "total_plants": len(plants),
        "families": {},
        "genera": {},
        "authors": {},
        "sample_plants": []
    }
    years = []

    # Aggregate data
    for plant in plants:
        family = plant.get("family", "Unknown")
        genus = plant.get("genus", "Unknown")
        author = plant.get("author", "Unknown")
        year = plant.get("year")

        stats["families"][family] = stats["families"].get(family, 0) + 1
        stats["genera"][genus] = stats["genera"].get(genus, 0) + 1
        stats["authors"][author] = stats["authors"].get(author, 0) + 1
        if year:
            years.append(year)

    # Add year range and sample plants
    stats["earliest_year"] = min(years) if years else None
    stats["latest_year"] = max(years) if years else None
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