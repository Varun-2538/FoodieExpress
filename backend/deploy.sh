#!/bin/bash

# FoodieExpress Backend Deployment Script for EC2
# This script sets up and deploys the Node.js backend

set -e

echo "======================================"
echo "FoodieExpress Backend Deployment"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    print_error "Please do not run as root. Run as a regular user with sudo privileges."
    exit 1
fi

# Update system packages
print_info "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js (using NodeSource repository for latest LTS)
print_info "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    print_info "Installing Node.js 20.x LTS..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
else
    print_info "Node.js is already installed: $(node -v)"
fi

# Install PM2 globally
print_info "Installing PM2 process manager..."
sudo npm install -g pm2

# Install nginx (optional)
read -p "Do you want to install Nginx as reverse proxy? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_info "Installing Nginx..."
    sudo apt install -y nginx
    sudo systemctl enable nginx
fi

# Create app directory
APP_DIR="/home/$(whoami)/foodie-express-backend"
print_info "Creating application directory at $APP_DIR..."
mkdir -p $APP_DIR

# Navigate to app directory
cd $APP_DIR

# Initialize git if deploying via git
read -p "Will you deploy via git clone/pull? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "Enter your git repository URL: " GIT_REPO
    if [ -d ".git" ]; then
        print_info "Pulling latest changes..."
        git pull origin main
    else
        print_info "Cloning repository..."
        git clone $GIT_REPO .
    fi
fi

# Create logs directory
mkdir -p logs

# Install dependencies
print_info "Installing npm dependencies..."
npm install --production

# Build TypeScript
print_info "Building TypeScript..."
npm run build

# Setup environment variables
if [ ! -f ".env" ]; then
    print_warning ".env file not found. Creating from .env.example..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        print_warning "Please edit .env file with your actual configuration:"
        print_warning "nano .env"
    else
        print_error ".env.example not found. Please create .env manually."
    fi
else
    print_info ".env file already exists."
fi

# Setup PM2
print_info "Setting up PM2..."
pm2 delete foodie-express-backend 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save
pm2 startup | tail -n 1 | sudo bash

# Setup firewall (UFW)
print_info "Configuring firewall..."
sudo ufw allow 22/tcp
sudo ufw allow 5000/tcp
if command -v nginx &> /dev/null; then
    sudo ufw allow 'Nginx Full'
fi
sudo ufw --force enable

print_info "======================================"
print_info "Deployment completed successfully!"
print_info "======================================"
print_info "Application is running on port 5000"
print_info "Check status: pm2 status"
print_info "View logs: pm2 logs foodie-express-backend"
print_info "Restart app: pm2 restart foodie-express-backend"
print_info "======================================"
