#!/bin/bash

# Install dependencies step by step
echo "Installing dependencies..."

cd /Users/vinaykumar/Downloads/contratlens-fr/backend

# Install core packages first
./venv/bin/pip install pydantic-settings
./venv/bin/pip install python-dotenv
./venv/bin/pip install loguru

echo "Core dependencies installed!"
echo ""
echo "Now run: ./venv/bin/python -m uvicorn app.main:app --reload"
