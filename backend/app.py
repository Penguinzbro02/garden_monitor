from flask import Flask, jsonify
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for frontend-backend communication

@app.route('/api/statistics', methods=['GET'])
def get_statistics():
    # Load the plants data from the JSON file
    with open('../data/plants_data.json', 'r') as file:
        plants = json.load(file)

    # Calculate statistics
    total_plants = len(plants)
    families = {}
    genera = {}
    authors = {}
    years = []

    for plant in plants:
        # Count families
        family = plant.get('family', 'Unknown')
        families[family] = families.get(family, 0) + 1

        # Count genera
        genus = plant.get('genus', 'Unknown')
        genera[genus] = genera.get(genus, 0) + 1

        # Count authors
        author = plant.get('author', 'Unknown')
        authors[author] = authors.get(author, 0) + 1

        # Collect years
        if 'year' in plant:
            years.append(plant['year'])

    statistics = {
        "total_plants": total_plants,
        "families": families,
        "genera": genera,
        "authors": authors,
        "earliest_year": min(years) if years else None,
        "latest_year": max(years) if years else None,
    }

    return jsonify(statistics)

if __name__ == '__main__':
    app.run(debug=True)