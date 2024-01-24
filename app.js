import express from "express";
import cors from "cors";
import logger from "morgan";
import "dotenv/config";
import path from "path";

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import authRouter from "./routes/api/auth-router.js";
import contactsRouter from "./routes/api/contacts-router.js";
import googleAuthRouter from "./routes/api/google-auth-router.js";


const app = express(); // - web-server

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));


// Swagger options
const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'My Test Swagger API',
      version: '1.0.0',
      description: "Showing off swagger-ui-express",
      license: {
        "name": "MIT",
        "url": "https://opensource.org/licenses/MIT"
      }
    },
    servers: [
      { url: 'http://localhost:3232' }
    ]
  },
  // Paths to files with annotations
  apis: ['./swagger.js', './routes/api/auth-router.js'],
};
const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
// Swagger options


app.use("/users", authRouter);
app.use("/api/contacts/", contactsRouter);
app.use("/auth", googleAuthRouter);


// Код для перевірки авторизації з link.html
const basePath = path.resolve();

app.use(express.static(path.join(basePath, "public")));
app.get("/link", (req, res) => {
  res.sendFile(path.join(basePath, "public", "link.html"));
});
// Код для перевірки авторизації з link.html


app.use((req, res) => {
  res.status(404).json({ message: "Not Found" })
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;

  res.status(status).json({ message });
});


export default app;