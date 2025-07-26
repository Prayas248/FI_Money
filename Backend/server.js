import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import apiRoutes from './routes.js';
import { swaggerSpec } from './swagger.js';

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URL || 'mongodb://localhost:27017/prayas';

const initializeServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Successfully connected to MongoDB.');

    const server = express();


    server.use(cors());
    server.use(express.json());


    server.use('/api', apiRoutes);
    server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

  
    server.listen(PORT, () => {
      console.log(`Server is running and listening on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Failed to connect to MongoDB or start the server:', error);
    process.exit(1);
  }
};

initializeServer();