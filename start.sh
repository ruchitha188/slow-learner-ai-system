#!/bin/bash

echo "Installing Python dependencies..."
pip install flask flask-cors scikit-learn -q

echo "Installing Node dependencies..."
cd node-server && npm install -q && cd ..

echo "Installing React dependencies..."
cd frontend && npm install -q && cd ..

echo "Starting all 3 servers..."

# Start Flask backend in background
cd backend && python app.py &

# Start Node auth server in background  
cd ../node-server && node index.js &

# Start React frontend (this one stays in foreground)
cd ../frontend && npm start
