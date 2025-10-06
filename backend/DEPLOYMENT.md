# FoodieExpress Backend - AWS EC2 Deployment Guide

## Prerequisites

- AWS EC2 instance (Ubuntu 20.04/22.04 recommended)
- SSH access to the instance
- Security Group configured with necessary ports open
- Domain name (optional, but recommended)

## Security Group Configuration

Ensure your EC2 Security Group has these inbound rules:

| Type  | Protocol | Port Range | Source    | Description              |
|-------|----------|------------|-----------|--------------------------|
| SSH   | TCP      | 22         | Your IP   | SSH access               |
| HTTP  | TCP      | 80         | 0.0.0.0/0 | HTTP traffic             |
| HTTPS | TCP      | 443        | 0.0.0.0/0 | HTTPS traffic (optional) |
| Custom| TCP      | 5000       | 0.0.0.0/0 | Backend API (if no nginx)|

## Deployment Methods

### Method 1: Automated Deployment (Recommended)

1. **Transfer files to EC2:**
   ```bash
   # From your local machine
   scp -r backend/* ubuntu@<your-ec2-ip>:~/foodie-express-backend/
   ```

2. **SSH into EC2:**
   ```bash
   ssh ubuntu@<your-ec2-ip>
   ```

3. **Run deployment script:**
   ```bash
   cd ~/foodie-express-backend
   chmod +x deploy.sh
   ./deploy.sh
   ```

4. **Configure environment variables:**
   ```bash
   nano .env
   ```
   Update with your production values:
   - `NODE_ENV=production`
   - `PORT=5000`
   - `SUPABASE_URL=your_production_supabase_url`
   - `SUPABASE_ANON_KEY=your_production_key`
   - `FRONTEND_URL=your_frontend_url`

5. **Restart the application:**
   ```bash
   pm2 restart foodie-express-backend
   ```

### Method 2: Git-Based Deployment

1. **SSH into EC2:**
   ```bash
   ssh ubuntu@<your-ec2-ip>
   ```

2. **Install dependencies:**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y

   # Install Node.js 20.x
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt install -y nodejs

   # Install PM2
   sudo npm install -g pm2
   ```

3. **Clone repository:**
   ```bash
   cd ~
   git clone <your-repo-url> foodie-express-backend
   cd foodie-express-backend/backend
   ```

4. **Install and build:**
   ```bash
   npm install
   npm run build
   ```

5. **Configure environment:**
   ```bash
   cp .env.example .env
   nano .env
   # Update with production values
   ```

6. **Start with PM2:**
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   # Copy and run the command that PM2 outputs
   ```

## Setting up Nginx (Optional but Recommended)

1. **Install Nginx:**
   ```bash
   sudo apt install -y nginx
   ```

2. **Configure Nginx:**
   ```bash
   sudo nano /etc/nginx/sites-available/foodie-express
   ```
   Copy contents from `nginx.conf` and update `server_name` with your domain.

3. **Enable site:**
   ```bash
   sudo ln -s /etc/nginx/sites-available/foodie-express /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

4. **Setup SSL with Let's Encrypt (recommended for production):**
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

## PM2 Commands

```bash
# Check status
pm2 status

# View logs
pm2 logs foodie-express-backend

# Restart
pm2 restart foodie-express-backend

# Stop
pm2 stop foodie-express-backend

# Monitor
pm2 monit
```

## Updating Your Application

```bash
# If using git
cd ~/foodie-express-backend
git pull origin main
npm install
npm run build
pm2 restart foodie-express-backend

# If using SCP
# Transfer files from local, then:
npm install
npm run build
pm2 restart foodie-express-backend
```

## Monitoring and Logs

```bash
# PM2 logs
pm2 logs foodie-express-backend

# Nginx logs
sudo tail -f /var/log/nginx/foodie-express-access.log
sudo tail -f /var/log/nginx/foodie-express-error.log

# System logs
sudo journalctl -u nginx -f
```

## Troubleshooting

### Port already in use
```bash
pm2 stop all
sudo lsof -i :5000
# Kill any process using port 5000
pm2 restart foodie-express-backend
```

### Permission issues
```bash
sudo chown -R $USER:$USER ~/foodie-express-backend
```

### Nginx configuration issues
```bash
sudo nginx -t
sudo systemctl status nginx
```

### Application not starting
```bash
pm2 logs foodie-express-backend --lines 100
```

## Security Best Practices

1. **Keep system updated:**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Setup firewall:**
   ```bash
   sudo ufw allow 22
   sudo ufw allow 80
   sudo ufw allow 443
   sudo ufw enable
   ```

3. **Secure your .env file:**
   ```bash
   chmod 600 .env
   ```

4. **Regular backups:**
   - Backup your .env file
   - Backup your Supabase database
   - Create AMI snapshots of your EC2 instance

5. **Use SSL/HTTPS** (required for production)

## Health Check

Test your deployment:
```bash
curl http://localhost:5000/api/health
curl http://your-domain.com/api/health  # If using nginx
```

## Support

If you encounter issues:
1. Check PM2 logs: `pm2 logs`
2. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. Verify environment variables are set correctly
4. Ensure Security Group rules allow traffic
5. Verify Supabase credentials are correct
