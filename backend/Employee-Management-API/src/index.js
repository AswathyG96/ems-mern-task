const express = require('express');
const loginRoutes = require('./routes/routes');
const conn = require("./connection/connection");
const cors = require('cors');

const startServer = async () => {
  try {
    // Connect to MongoDB
    await conn;
    console.log('Connected to MongoDB 🗄️ ');

    // Create Express app
    const app = express();
    
    // Middleware
    app.use(express.json());
    app.use(cors())
    // Routes
    app.use('/uploads', express.static('uploads'));
    app.use('/api/v1', loginRoutes);
   
    // Start the server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server is listerning on port ${PORT}.....................📡`);
     
    });
  } catch (error) {
    console.error('Error starting server:', error.message);
  }
};

startServer();
