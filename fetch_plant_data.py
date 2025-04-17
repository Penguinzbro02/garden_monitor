import os
import requests
import json

# Configuration
API_KEY = ""  # Replace with your actual Trefle API key
if not API_KEY:
    raise ValueError("API_KEY must be set. Please provide your Trefle API key.")

BASE_URL = "https://trefle.io/api/v1"
DATA_DIR = "data"
PLANTS_FILE = os.path.join(DATA_DIR, "plants_data.json")
KINGDOMS_FILE = os.path.join(DATA_DIR, "kingdoms_data.json")

# Fetch plant data from API and save to file
def fetch_plant_data():
    try:
        plants = []
        for page in range(1, 6):  # Fetch first 5 pages
            print(f"Fetching plants, page {page}...")
            response = requests.get(f"{BASE_URL}/plants", params={"token": API_KEY, "page": page})
            response.raise_for_status()
            data = response.json().get("data", [])
            plants.extend(data)

        plants.sort(key=lambda x: x["id"])  # Sort by ID
        print(f"Total plants fetched: {len(plants)}")

        with open(PLANTS_FILE, "w") as file:
            json.dump(plants, file, indent=4)
        print(f"Plant data saved to {PLANTS_FILE}")
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")

# Fetch kingdom data from API and save to file
def fetch_kingdom_data():
    try:
        print("Fetching kingdom data...")
        response = requests.get(f"{BASE_URL}/kingdoms", params={"token": API_KEY})
        response.raise_for_status()
        kingdoms = response.json()

        with open(KINGDOMS_FILE, "w") as file:
            json.dump(kingdoms, file, indent=4)
        print(f"Kingdom data saved to {KINGDOMS_FILE}")
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")

# Main execution
if __name__ == "__main__":
    fetch_plant_data()
    fetch_kingdom_data()