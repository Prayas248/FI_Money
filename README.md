# Fi Money - Inventory Management System

A modern, full-stack inventory management application built with React and Node.js, featuring JWT authentication, product management, and real-time analytics.

![alt text](docker.png)

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure registration and login with JWT tokens
- **Product Management**: Add, update, search, and manage inventory ite2. Deploy to your preferred platform (Heroku, AWS, DigitalOcean, etc.)

#### Frontend Deployment- **Inventory Tracking**: Real-time stock level monitoring with low-stock alerts
- **Analytics Dashboard**: Overview of total products, inventory value, and stock status
- **Search & Pagination**: Efficient product search with paginated results
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS

### Technical Features
- **RESTful API**: Well-documented API with Swagger/OpenAPI integration
- **Database Integration**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Real-time Updates**: Automatic refresh of inventory data
- **Input Validation**: Server-side validation with express-validator
- **Error Handling**: Comprehensive error handling and user feedback

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Headless UI** - Accessible UI components
- **Heroicons** - Beautiful SVG icons
- **Axios** - HTTP client for API requests
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 5** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Swagger** - API documentation
- **CORS** - Cross-origin resource sharing

### DevOps & Deployment
- **Docker** - Containerization platform
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Web server for frontend serving
- **Alpine Linux** - Lightweight container base images

## 📦 Installation

### Prerequisites

#### Option 1: Docker (Recommended)
- Docker and Docker Compose installed on your system
- No need for Node.js or MongoDB installation

#### Option 2: Manual Setup
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Clone the Repository
```bash
git clone https://github.com/Prayas248/FI_Money.git
cd FI_Money
```

## 🐳 Docker Installation (Recommended)

The easiest way to run the application is using Docker. This will set up the entire stack including MongoDB, Backend, and Frontend.

### Quick Start with Docker
```bash
# Clone the repository
git clone https://github.com/Prayas248/FI_Money.git
cd FI_Money

# Start all services with Docker Compose
docker-compose up -d
```

This will start:
- **MongoDB** on port `27017`
- **Backend API** on port `8080`
- **Frontend** on port `3000`

### Docker Commands
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and start (after code changes)
docker-compose up --build -d

# Stop and remove all containers, networks, and volumes
docker-compose down -v
```

### Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **API Documentation**: http://localhost:8080/api-docs
- **MongoDB**: localhost:27017

### Docker Architecture
The application uses a multi-container setup:
- **Frontend Container**: Nginx serving the built React app
- **Backend Container**: Node.js Express server
- **MongoDB Container**: Official MongoDB image with persistent data storage
- **Network**: All containers communicate through a custom bridge network

## ⚙️ Manual Installation (Alternative)

If you prefer to run the application without Docker, follow these steps:

### Backend Setup
```bash
cd Backend
npm install
```

Create a `.env` file in the Backend directory:
```env
PORT=8080
MONGO_URL=mongodb://localhost:27017/fimoney
JWT_SECRET=your-secret-key-here
```

Start the backend server:
```bash
npm run dev    # Development mode with nodemon
# or
npm start      # Production mode
```

The API will be available at `http://localhost:8080`
API documentation available at `http://localhost:8080/api-docs`

### Frontend Setup
```bash
cd Frontend
npm install
```

Start the frontend development server:
```bash
npm run dev    # Development mode
# or
npm start      # Alternative development command
```

The application will be available at `http://localhost:3000`

> **Note**: When running manually, make sure MongoDB is running and accessible at the configured connection string.

## 🔧 Configuration

### Environment Variables

#### Docker Environment (Recommended)
When using Docker Compose, the environment is automatically configured. The MongoDB connection string is set to `mongodb://mongodb:27017/prayas` to connect to the MongoDB container.

#### Manual Setup Environment Variables

##### Backend (.env)
```env
PORT=8080                                    # Server port
MONGO_URL=mongodb://localhost:27017/fimoney  # MongoDB connection string
JWT_SECRET=your-jwt-secret-key               # JWT signing secret
```

##### Frontend
The frontend is configured to connect to the backend at `http://localhost:8080`. To change this, update the `API_BASE_URL` in `src/services/api.js`.

## 📚 API Documentation

The API is fully documented using Swagger/OpenAPI. Once the backend is running, visit:
```
http://localhost:8080/api-docs
```

### Key Endpoints

#### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login

#### Products (Protected Routes)
- `GET /api/products` - Get paginated products list
- `POST /api/products` - Add new product
- `PUT /api/products/:id/quantity` - Update product quantity

## 🎯 Usage

### Getting Started
1. **Register**: Create a new account on the registration page
2. **Login**: Sign in with your credentials
3. **Dashboard**: View inventory overview and key metrics
4. **Add Products**: Use the "Add Product" button to create new inventory items
5. **Manage Inventory**: Search, update quantities, and monitor stock levels
6. **Analytics**: Track inventory performance and trends

### Product Management
- **Add Products**: Fill in product name, price, quantity, and optional description
- **Update Quantities**: Modify stock levels directly from the products page
- **Search Products**: Use the search bar to find specific items
- **Stock Alerts**: Monitor low-stock items with visual indicators

### User Interface
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark Mode Ready**: UI components support dark mode styling
- **Accessibility**: Built with accessible components and proper ARIA labels

## 🧪 Testing

### Docker Testing
```bash
# Start the application with Docker
docker-compose up -d

# Wait for services to be ready, then run tests
docker-compose exec backend python test_api.py
```

### Backend API Testing
A Python test script is included to test all API endpoints:

```bash
cd Backend
python test_api.py
```

The test script covers:
- User registration
- Authentication
- Product creation
- Quantity updates
- Product retrieval

### Manual Testing
1. Start the application (Docker: `docker-compose up -d` or manually start both servers)
2. Register a new user account
3. Add some test products
4. Test search functionality
5. Update product quantities
6. Verify dashboard analytics

## 📁 Project Structure

```
FI_Money/
├── docker-compose.yml      # Docker Compose configuration
├── Backend/
│   ├── Dockerfile          # Backend container configuration
│   ├── controllers/        # Route handlers
│   │   ├── add_product.js
│   │   ├── get_products.js
│   │   ├── login.js
│   │   ├── register.js
│   │   └── update_product.js
│   ├── lib/
│   │   └── auth.js        # Authentication utilities
│   ├── models/            # Mongoose models
│   │   ├── Product.js
│   │   └── User.js
│   ├── package.json
│   ├── routes.js         # API routes
│   ├── server.js         # Express server
│   ├── swagger.js        # API documentation
│   └── test_api.py       # API testing script
├── Frontend/
│   ├── Dockerfile        # Frontend container configuration
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── components/   # React components
│   │   │   ├── AddProduct.jsx
│   │   │   ├── Layout.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── contexts/     # React contexts
│   │   │   └── AuthContext.jsx
│   │   ├── pages/        # Page components
│   │   │   ├── Analytics.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Products.jsx
│   │   │   └── Register.jsx
│   │   ├── services/     # API services
│   │   │   └── api.js
│   │   ├── App.jsx       # Main app component
│   │   ├── index.css     # Global styles
│   │   └── main.jsx      # App entry point
│   ├── package.json
│   ├── tailwind.config.js # Tailwind configuration
│   └── vite.config.js    # Vite configuration
└── README.md
```

## 🚀 Deployment

### Docker Deployment (Recommended)

#### Production Docker Compose
For production deployment, create a `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    restart: unless-stopped
    volumes:
      - mongo-data:/data/db
    environment:
      - MONGO_INITDB_DATABASE=prayas
    networks:
      - app-network

  backend:
    build:
      context: ./Backend
      dockerfile: Dockerfile
    restart: unless-stopped
    environment:
      - MONGO_URL=mongodb://mongodb:27017/prayas
      - JWT_SECRET=${JWT_SECRET}
      - NODE_ENV=production
    depends_on:
      - mongodb
    networks:
      - app-network

  frontend:
    build:
      context: ./Frontend
      dockerfile: Dockerfile
    restart: unless-stopped
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - app-network

  nginx:
    image: nginx:alpine
    restart: unless-stopped
    ports:
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - frontend
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  mongo-data:
```

Deploy with:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

#### Container Registry Deployment
1. Build and tag images:
   ```bash
   docker build -t your-registry/fi-money-backend:latest ./Backend
   docker build -t your-registry/fi-money-frontend:latest ./Frontend
   ```

2. Push to registry:
   ```bash
   docker push your-registry/fi-money-backend:latest
   docker push your-registry/fi-money-frontend:latest
   ```

3. Deploy on your server using the pushed images

### Manual Deployment

#### Backend Deployment
1. Set production environment variables
2. Ensure MongoDB connection string is configured
3. Deploy to your preferred platform (Heroku, AWS, DigitalOcean, etc.)

### Frontend Deployment
1. Build the production bundle:
   ```bash
   cd Frontend
   npm run build
   ```
2. Deploy the `dist` folder to your static hosting service (Netlify, Vercel, etc.)
3. Update API base URL for production

### Environment Considerations
- Use strong JWT secrets in production
- Configure CORS properly for your domain
- Use HTTPS in production
- Set up proper MongoDB indexes for performance
- Use environment-specific Docker Compose files
- Implement proper logging and monitoring for containers
- Set up health checks for container orchestration
- Use secrets management for sensitive environment variables

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
1. Follow the existing code style
2. Add tests for new features
3. Update documentation as needed
4. Ensure all tests pass before submitting

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Prayas Yadav**
- GitHub: [@Prayas248](https://github.com/Prayas248)

## 🐛 Issues & Support

If you encounter any issues or have questions:
1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Include steps to reproduce the problem

## 🔮 Future Enhancements

- [ ] Advanced analytics and reporting
- [ ] Product categories and tags
- [ ] Bulk operations for products
- [ ] Export functionality (CSV, PDF)
- [ ] Product images upload
- [ ] Multi-user roles and permissions
- [ ] Inventory alerts and notifications
- [ ] Barcode scanning support
- [ ] Integration with external services

## 📈 Performance

The application is optimized for performance with:
- Efficient MongoDB queries with pagination
- Frontend state management with React Context
- Debounced search to reduce API calls
- Lazy loading for large datasets
- Responsive design for all devices

---

**Happy Inventory Management! 📦✨**
