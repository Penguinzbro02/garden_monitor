# Garden Monitor

Garden Monitor is a tool designed to help gardeners of all experience levels care for and cultivate plants.

## Run the Project

### Backend

Prerequisites:
- [Python](https://www.python.org/)

```bash
# Create a virtual environment and install dependencies
python -m venv venv && venv\Scripts\activate && pip install requests flask-cors

# Start the Backend Flask Server
venv\Scripts\activate && python backend\app.py

# Fetch plant data (optional)
venv\Scripts\activate && python fetch_plant_data.py
```

### Web App

Prerequisites:
- [Node.js](https://nodejs.org/)

```bash
# Install dependencies
cd client && npm install @hookform/resolvers react react-dom react-hook-form react-router-dom react-scripts yup && cd ..

# Start the Frontend React App
npm --prefix client start
```
