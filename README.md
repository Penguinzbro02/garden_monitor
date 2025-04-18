# Garden Monitor

Garden Monitor is a tool designed to help gardeners of all experience levels care for and cultivate plants.

# Steps to Run the Project

```bash
python -m venv venv
venv\Scripts\activate && pip install requests flask-cors

venv\Scripts\activate && python app.py
venv\Scripts\activate && python fetch_plant_data.py
```

# Install the latest stable versions of react and react-dom

```bash
Remove-Item -Recurse -Force node_modules, package-lock.json
npm cache clean --force

npm uninstall react-router-dom
npm install react@18 react-dom@18
npm install react-router-dom@6

npm install
npm install react@18 react-dom@18 react-router-dom@6 react-scripts

# Run the One-liner commands from the root directory only
# One-liner to Setup the Backend
cd backend && python -m venv venv && venv\Scripts\activate && pip install requests flask-cors

# One-liner to Start the Backend
cd backend && venv\Scripts\activate && python app.py

# One-liner to Setup the Web App
cd client && npm install react react-dom react-router-dom react-scripts

# One-liner to Start the Web App
cd client && npm start
```

# Steps to Run the web app

```bash
cd client
npm start
```

## Packages used

- react-hook-form
- yup
- @hookform/resolvers
