#!/bin/bash
# Wait for server to be ready
echo "Waiting for dev server to start..."
sleep 5

# Test if server is running
echo "Testing server connectivity..."
curl -f http://localhost:3001 > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "✓ Server is running on port 3001"
else
  echo "✗ Server is not responding on port 3001"
  exit 1
fi

# Run Cypress tests
echo "Starting Cypress tests..."
npx cypress run --e2e --headless --browser chrome
