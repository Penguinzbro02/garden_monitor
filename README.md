# Garden Monitor

Garden Monitor is a tool designed to help gardeners of all experience levels care for and cultivate plants.

## Run the Project

### Backend

```bash
# Create a virtual environment and install dependencies
python -m venv venv && venv\Scripts\activate && pip install requests flask-cors

# Start the Backend Flask Server
venv\Scripts\activate && python app.py

# Fetch plant data (optional)
venv\Scripts\activate && python fetch_plant_data.py
```

### Web App

```bash
# Clean up the project
Remove-Item -Recurse -Force node_modules, package-lock.json && npm cache clean --force

# Install dependencies
cd client && npm install react react-dom react-router-dom react-scripts

# Start the Frontend React App
cd client && npm start
```
