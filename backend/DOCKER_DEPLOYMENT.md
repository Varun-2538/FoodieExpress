# FoodieExpress Backend - Docker Deployment Guide

## Prerequisites

- Docker installed on EC2
- Docker Compose installed on EC2
- AWS EC2 instance with Ubuntu
- Security Group with ports 80 and 443 open

## Files Structure

```
backend/
├── Dockerfile              # Multi-stage Docker build
├── docker-compose.yml      # Docker Compose configuration
├── nginx.docker.conf       # Nginx configuration for Docker
├── .dockerignore          # Files to exclude from Docker build
├── .env                   # Environment variables (create this)
└── src/                   # Your source code
```

## Installation on EC2

### 1. Install Docker and Docker Compose

SSH into your EC2 instance:

```bash
ssh ubuntu@<your-ec2-ip>
```

Install Docker:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER

# Log out and log back in for group changes to take effect
exit
```

SSH back in:

```bash
ssh ubuntu@<your-ec2-ip>
```

Install Docker Compose:

```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version
```

### 2. Deploy Your Application

Clone your repository:

```bash
cd ~
git clone https://github.com/Varun-2538/FoodieExpress.git
cd FoodieExpress/backend
```

Create `.env` file:

```bash
nano .env
```

Add your environment variables:

```env
NODE_ENV=production
PORT=5000

# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Google OAuth (if using)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Frontend URL
FRONTEND_URL=http://your-frontend-url.com

# JWT Secret
JWT_SECRET=your_jwt_secret_key
```

Save and exit (Ctrl+O, Enter, Ctrl+X)

### 3. Build and Start Containers

```bash
# Build and start containers in detached mode
docker-compose up -d --build

# Check if containers are running
docker-compose ps

# View logs
docker-compose logs -f
```

### 4. Stop Previous PM2 Instance (if running)

If you have PM2 running from the previous setup:

```bash
pm2 stop all
pm2 delete all

# Stop nginx if running directly
sudo systemctl stop nginx
```

### 5. Verify Deployment

Test from EC2:

```bash
curl http://localhost/api/health
```

Test from your browser:

```
http://<your-ec2-ip>/api/health
```

## Docker Commands Reference

### Container Management

```bash
# Start containers
docker-compose up -d

# Stop containers
docker-compose down

# Restart containers
docker-compose restart

# View running containers
docker-compose ps

# View logs (all services)
docker-compose logs -f

# View logs (specific service)
docker-compose logs -f backend
docker-compose logs -f nginx
```

### Updating Your Application

```bash
# Pull latest code
cd ~/FoodieExpress/backend
git pull origin main

# Rebuild and restart
docker-compose up -d --build

# Or rebuild specific service
docker-compose up -d --build backend
```

### Container Shell Access

```bash
# Access backend container
docker-compose exec backend sh

# Access nginx container
docker-compose exec nginx sh
```

### Cleanup

```bash
# Stop and remove containers
docker-compose down

# Remove containers, volumes, and images
docker-compose down -v --rmi all

# Clean up unused Docker resources
docker system prune -a
```

## Monitoring

### Check Container Health

```bash
docker-compose ps
```

Healthy containers will show "Up" status.

### View Resource Usage

```bash
docker stats
```

### Check Logs

```bash
# All logs
docker-compose logs -f

# Last 100 lines
docker-compose logs --tail=100

# Backend only
docker-compose logs -f backend
```

## Troubleshooting

### Container won't start

```bash
# Check logs
docker-compose logs backend

# Check if port is already in use
sudo lsof -i :80
sudo lsof -i :5000
```

### Cannot connect to backend

```bash
# Check if containers are running
docker-compose ps

# Check nginx logs
docker-compose logs nginx

# Test backend directly (inside container)
docker-compose exec backend wget -O- http://localhost:5000/api/health
```

### Rebuild from scratch

```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

### Environment variables not loading

```bash
# Verify .env file exists
cat .env

# Restart containers
docker-compose down
docker-compose up -d
```

## Security Best Practices

1. **Never commit `.env` file** - Keep it in `.gitignore`

2. **Use secrets for sensitive data:**
   ```bash
   chmod 600 .env
   ```

3. **Keep Docker updated:**
   ```bash
   sudo apt update && sudo apt upgrade docker-ce docker-ce-cli containerd.io
   ```

4. **Limit container resources** (optional):
   ```yaml
   # Add to docker-compose.yml under backend service
   deploy:
     resources:
       limits:
         cpus: '0.5'
         memory: 512M
   ```

5. **Regular backups:**
   - Backup your `.env` file
   - Backup your database
   - Create AMI snapshots

## SSL/HTTPS Setup (Optional but Recommended)

For production, add SSL with Let's Encrypt:

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Stop nginx container temporarily
docker-compose stop nginx

# Get SSL certificate
sudo certbot certonly --standalone -d your-domain.com

# Update nginx.docker.conf to include SSL
# Then restart
docker-compose up -d
```

## Auto-restart on System Reboot

Docker Compose with `restart: unless-stopped` will automatically start containers on system reboot if Docker service is enabled:

```bash
sudo systemctl enable docker
```

## Performance Optimization

1. **Use Alpine images** (already configured)
2. **Multi-stage builds** (already configured)
3. **Volume mounts for logs** (already configured)
4. **Health checks** (already configured)

## Production Checklist

- [ ] Docker and Docker Compose installed
- [ ] `.env` file configured with production values
- [ ] Security Group has ports 80 and 443 open
- [ ] Containers running and healthy
- [ ] Health endpoint accessible
- [ ] Logs directory writable
- [ ] SSL certificate configured (if using domain)
- [ ] Monitoring setup (optional: CloudWatch, Prometheus)
- [ ] Backup strategy in place
- [ ] CI/CD pipeline configured (optional)

## Support

If you encounter issues:
1. Check container logs: `docker-compose logs -f`
2. Verify environment variables: `docker-compose config`
3. Check container health: `docker-compose ps`
4. Inspect specific container: `docker-compose exec backend sh`
