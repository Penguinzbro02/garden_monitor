# Garden Monitor

Garden Monitor is a tool designed to help gardeners of all experience levels care for and cultivate plants.

## Run the Project

### Backend

Prerequisites:
- [Python](https://www.python.org/)

```bash
# Create a virtual environment and install dependencies
python -m venv venv && venv\Scripts\activate && python.exe -m pip install --upgrade pip && pip install requests flask-cors

# Start the Backend Flask Server
venv\Scripts\activate && python backend\app.py

# Fetch plant data (optional)
venv\Scripts\activate && python fetch_plant_data.py
```

### Web App

Prerequisites:
- [Node.js v22.15.0 (LTS)](https://nodejs.org)

```bash
# Install dependencies in the client directory
npm --prefix client install react react-dom react-router-dom react-scripts webpack@latest webpack-cli@latest

# Start the Frontend React App in the client directory
npm --prefix client start
```
