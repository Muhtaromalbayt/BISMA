#!/bin/bash

echo "Starting BISMA local environment..."

# Start backend (connecting to remote D1 to keep data)
cd backend
npm install
echo "Starting backend..."
npm run dev &
BACKEND_PID=$!

# Start frontend
cd ../frontend
npm install
echo "Starting frontend..."
npm run dev &
FRONTEND_PID=$!

# Wait for both processes
wait $BACKEND_PID
wait $FRONTEND_PID
