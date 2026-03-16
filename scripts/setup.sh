#!/bin/bash
echo "=== AI Slow Learner System — Setup ==="

echo "Step 1: Installing Python backend dependencies..."
cd backend
pip install -r ../requirements.txt
cd ..

echo "Step 2: Installing Node auth server dependencies..."
cd node-server
npm install
cd ..

echo "Step 3: Installing React frontend dependencies..."
cd frontend
npm install
cd ..

echo "=== Setup complete! ==="
echo "Terminal 1: cd backend && python app.py"
echo "Terminal 2: cd node-server && node index.js"
echo "Terminal 3: cd frontend && npm start"
