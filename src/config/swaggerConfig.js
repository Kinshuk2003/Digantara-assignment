import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Digantara API',
      version: '1.0.0',
      description: 'API documentation for Digantara Assignment',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/route/**/*.js', './src/controller/**/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
