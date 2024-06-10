const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const contactsRoutes = require("./routes/contactsRoutes");

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/contacts", contactsRoutes);

module.exports = app;
