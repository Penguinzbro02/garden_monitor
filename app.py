import json


# Function to load data from a JSON file
def load_data(file_name):
    try:
        with open(file_name, "r") as file:
            return json.load(file)
    except FileNotFoundError:
        print(f"{file_name} not found.")
        return []


# Function to print users
def print_users():
    users = load_data('data/users.json')
    print("Users:")
    for user in users:
        print(f"User ID: {user['user_id']}, Email: {user['email']}, Name: {user['first_name']} {user['last_name']}")
    print()


# Function to print plant information
def print_plants():
    plants = load_data('data/plants.json')
    print("Plants Info:")
    for plant in plants:
        print(f"Plant ID: {plant['plant_id']}, Name: {plant['plant_name']}")
        print(f"  Ideal Temperature: {plant['ideal_temperature']}")
        print(f"  Growth Stages: {', '.join(plant['growth_stages'])}")
        print(f"  Planting Season: {plant['planting_season']}")
        print(f"  Harvest Time: {plant['harvest_time']}")
        print()

def print_logs():
    logs = load_data('data/logs.json')
    print("Logs:")
    for log in logs:
        print(f"User ID: {log['user_id']}")
        print(f"Plant ID: {log['plant_id']}")
        print(f"Plant Start Date: {log['plant_start_date']}")
        print(f"Plant End Date: {log['plant_end_date']}")
        print(f"Height History: {', '.join(log['height_history'])}")
        print(f"Watering History: {', '.join(log['watering_history'])}")
        print(f"Fertilizer History: {', '.join(log['fertilizer_history'])}")
        print(f"Photo: {log['photo']}")
        print(f"Notes: {log['notes']}")
        print()

def main():
    print_users()
    print_plants()
    print_logs()


if __name__ == "__main__":
    main()
