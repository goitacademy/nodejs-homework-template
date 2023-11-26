// app.js
const mongoose = require("mongoose");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const routes = require("./routes");
const notFoundMiddleware = require("./middlewares/notFound");
const errorHandlerMiddleware = require("./middlewares/errorHandler");

const swaggerJSDOC = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const path = require('path');
const multer = require('multer');

const port = process.env.PORT || 3000;

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// Document
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API GoIT",
      version: "1.0.0",
      description:
        "This is a API REST app made with Express. It controls the info about API GoIT.",
    },
    servers: [
      {
        url: `http://127.0.0.1:${port}`,
        description: "Local server",
      },
      {
        url: `https://Codekapp.app`,
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
        },
      },
    },
  },
  apis: [
    process.cwd() + "/routes/*.js",
    process.cwd() + "/routes/api/*.js",
    process.cwd() + "/models/*.js",
    // process.cwd() + "/schemas.js",
  ],
};

const apiSpecification = swaggerJSDOC(swaggerOptions);
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(apiSpecification));

// Configuración de Multer para subir avatares
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public', 'avatars'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });


app.use('/avatars', express.static(path.join(__dirname, 'public', 'avatars')));

app.use("/api", routes());

app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);

module.exports = {
  app,
  upload,
  startServer: async () => {
    try {
      await mongoose.connect(process.env.CONNECTION_MONGODB);
      console.log("Database connection successful");
      app.listen(port, () => {
        console.log(`Server running. Use our API on Port:${port}`);
      });
    } catch (error) {
      console.error("Error connecting to the database:", error);
      process.exit(1);
    }
  },
};
