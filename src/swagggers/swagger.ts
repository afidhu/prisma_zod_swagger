import type { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My PRODUCTS API Docs',
      version: '1.0.0',
      description: 'A sample API with Swagger documentation',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routers/*.ts', './src/schema/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
  // Swagger UI page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // JSON format
  app.get('/docs.json', (req: Request, resp: Response) => {
    resp.setHeader('Content-Type', 'application/json');
    resp.send(swaggerSpec);
  });

  console.info(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
