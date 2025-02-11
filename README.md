# CloudOne Client

The frontend application for the CloudOne project, built with modern JavaScript and containerized using Docker. This client application works in conjunction with the [CloudOne API](https://github.com/tzone85/cloudone.git) to deliver a complete web application experience.

## 🚀 Project Overview

CloudOne Client is the user interface component of the CloudOne ecosystem, demonstrating frontend containerization best practices and Docker orchestration. The project implements:

* Modern JavaScript frontend application
* Nginx server for static file serving
* Multi-stage Docker builds for optimized production deployment
* Development and production environment configurations
* Seamless integration with CloudOne API

### Key Implementation Details

#### Frontend Application
* Modern JavaScript architecture
* Static asset optimization
* Development mode with hot-reloading
* Production-ready build configuration

#### Nginx Configuration
* Optimized static file serving
* Gzip compression for improved performance
* Cache control headers
* HTTP/2 support in production
* SSL configuration preparation

### Live Link
http://ec2-54-251-169-51.ap-southeast-1.compute.amazonaws.com/

## 🛠️ Tech Stack

* **Frontend:** JavaScript
* **Server:** Nginx (Latest Alpine)
* **Containerization:** Docker & Docker Compose
* **Environment:** Development and Production configurations

## System Requirements

* Node.js v10.15.3 or higher
* Docker Engine 19.03.0+
* Docker Compose 1.27.0+
* Available ports 80 and 3000

##  Project Structure
```bash
cloudone-client/
├── source/ # Frontend source code
├── Dockerfile-nginx        # Nginx container configuration
├── Dockerfile-node         # Node.js development container
├── default.conf            # Nginx server configuration
├── docker-compose.yml      # Development environment
└── docker-compose.prod.yml # Production environment
```

## 🔧 Installation & Setup

1. Clone the client repository:
```bash
git clone https://github.com/tzone85/cloudone-client.git
cd cloudone-client
```
Clone the API repository in a separate directory
```bash
git clone https://github.com/tzone85/cloudone.git
cd cloudone
```

2. Development Environment Setup:
```bash
# Start the client application
docker-compose up --build

# In a separate terminal, start the API (from the API directory)
cd ../cloudone
docker-compose up --build
```

3. Production Environment:
```bash
docker-compose -f docker-compose.prod.yml up --build
```

## 🌟 Features

### Development Environment
* Hot-reloading for immediate feedback
* Volume mounting for real-time code updates
* Development-specific Nginx configuration
* Exposed ports for debugging

### Production Environment
* Multi-stage builds for minimal image size
* Optimized Nginx configuration
* Proper cache headers and compression
* Security-focused settings

## 🔨 Development

### Local Development

```bash
# Start development environment
docker-compose up

# View logs
docker-compose logs -f

# Rebuild containers
docker-compose up --build
```

### Making Changes
1. Edit files in the `source` directory
2. Changes will automatically reflect in development
3. Rebuild for production using the production compose file

## 🚀 Deployment

### Prerequisites
* Docker Engine 19.03.0+
* Docker Compose 1.27.0+
* Available ports 80 and 3000

### Production Deployment Steps
1. Configure environment variables if needed
2. Build and start the production stack:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🔒 Security Considerations
* Nginx configured with security best practices
* Production builds minimize included dependencies
* Container isolation and proper networking
* Prepared SSL configuration (needs certificates)

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License
This project is open source and available under the MIT License.

## 📞 Contact
Project Link: https://github.com/tzone85/cloudone-client

## 🥸 Author
> This project is created by @tzone85 A.K.A. Thando The Village Boy Mini

## Related Projects
- [CloudOne API](https://github.com/tzone85/cloudone.git) - The backend API service for this application
```

This README maintains consistency with the API project while focusing on the client-specific aspects. It provides clear instructions for setting up both the client and API components together, making it easier for new developers to get started with the complete system.


