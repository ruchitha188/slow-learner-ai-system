#!/bin/bash
echo "Installing Python backend dependencies..."
cd backend
pip install -r ../requirements.txt

echo "Installing Node auth server dependencies..."
cd ../node-server
npm install

echo "Installing React frontend dependencies..."
cd ../frontend
npm install

echo "Setup complete! Run backend, node-server, and frontend in separate terminals."

