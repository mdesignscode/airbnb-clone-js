const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HBNB Data API',
      version: '1.0.0',
      description: 'Interact with my airbnb clone! Perform CRUD operations for Amenities, Users, Cities, State, Places, and Reviews.',
      contact: {
        name: 'Marlon Baatjes',
        email: 'marlonbaatjes62@gmail.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server'
      }
    ]
  },
  apis: ['../*.js'] // Specify the path to your API routes
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
module.exports = swaggerSpec;
