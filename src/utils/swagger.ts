import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import type { Express } from "express";
import { log } from "./logger";
import options from "../openapi";

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app: Express, port: string | 3000) => {
  //* swagger page
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    })
  );

  //*Docs in json format
  app.get("/api-docs/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  log.info(
    `Docs available at ${
      app.get("env") === "development" && `http://localhost:${port}/api-docs`
    } `
  );
};
