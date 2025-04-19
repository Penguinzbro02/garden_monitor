from flask import Flask, jsonify, request
from flask_cors import CORS
import json

# Initialize Flask app and enable CORS
app = Flask(__name__)
CORS(app)

# API route to calculate and return plant statistics
@app.route('/api/statistics', methods=['GET'])
def get_statistics():
    # Load plant data
    with open('../data/plants_data.json', 'r') as file:
        plants = json.load(file)

    # Initialize statistics containers
    stats = {
        "total_plants": len(plants),
        "families": {},
        "genera": {},
        "authors": {},
        "years": [],
        "sample_plants": []
    }

    # Process plant data
    for plant in plants:
        stats["families"][plant.get('family', 'Unknown')] = stats["families"].get(plant.get('family', 'Unknown'), 0) + 1
        stats["genera"][plant.get('genus', 'Unknown')] = stats["genera"].get(plant.get('genus', 'Unknown'), 0) + 1
        stats["authors"][plant.get('author', 'Unknown')] = stats["authors"].get(plant.get('author', 'Unknown'), 0) + 1
        if 'year' in plant:
            stats["years"].append(plant['year'])

    # Add year statistics
    stats["earliest_year"] = min(stats["years"]) if stats["years"] else None
    stats["latest_year"] = max(stats["years"]) if stats["years"] else None
    del stats["years"]  # Remove raw years list to keep response clean

    # Add a sample of 10 plants with name and image_url
    stats["sample_plants"] = [
        {"name": plant.get("common_name", "Unknown"), "image_url": plant.get("image_url", "")}
        for plant in plants[:10]
    ]

    return jsonify(stats)

# Retrieves the incoming form data from the post request. Then save them to JSON file
LOGS_FILE = '../data/logs.json'
@app.route('/api/save-log', methods=['POST'])
def save_log():
    try:
        new_log = request.json
        reversed_log = {key: new_log[key] for key in reversed(new_log)}

        try:
            with open(LOGS_FILE, 'r') as file:
                logs = json.load(file)  
        except FileNotFoundError:
            logs = []  
        # handle empty json file
        except json.JSONDecodeError:
            logs = []  
        logs.append(reversed_log)

        with open(LOGS_FILE, 'w') as file:
            json.dump(logs, file, indent=4)  

        return jsonify({'message': 'Log saved successfully!'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.errorhandler(404)
def page_not_found(e):
    return "Error: Page not found", 404

# Run the app
if __name__ == '__main__':
    app.run(debug=True)