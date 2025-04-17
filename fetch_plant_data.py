import os
import requests
import json

# Configuration
API_URL = "https://trefle.io/api/v1/plants"
KINGDOMS_URL = "https://trefle.io/api/v1/kingdoms"
API_KEY = ""  # Replace with your actual Trefle API key

if not API_KEY:
    raise ValueError("API_KEY must be set. Please provide your Trefle API key.")

DATA_DIR = "data"
OUTPUT_FILE = os.path.join(DATA_DIR, "plants_data.json")
KINGDOMS_OUTPUT_FILE = os.path.join(DATA_DIR, "kingdoms_data.json")

# Fetch and save plant data
def fetch_plant_data():
    try:
        response = requests.get(API_URL, params={"token": API_KEY})  # API request
        response.raise_for_status()  # Check for errors
        plant_data = response.json()  # Parse response

        # Sort the data by 'id' in ascending order
        if isinstance(plant_data, dict) and "data" in plant_data:
            plant_data["data"] = sorted(plant_data["data"], key=lambda x: x["id"])
            
            # Print the number of plants
            print(f"Number of plants: {len(plant_data['data'])}")

        with open(OUTPUT_FILE, "w") as file:  # Save to file
            json.dump(plant_data, file, indent=4)

        print(f"Data saved to {OUTPUT_FILE}")
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")

# Fetch and save kingdom data
def fetch_kingdom_data():
    try:
        response = requests.get(KINGDOMS_URL, params={"token": API_KEY})  # API request
        response.raise_for_status()  # Check for errors
        kingdom_data = response.json()  # Parse response

        # Save the data to a file
        with open(KINGDOMS_OUTPUT_FILE, "w") as file:
            json.dump(kingdom_data, file, indent=4)

        print(f"Kingdom data saved to {KINGDOMS_OUTPUT_FILE}")
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")

# Entry point
if __name__ == "__main__":
    fetch_plant_data()
    fetch_kingdom_data()