// const app = require("./app");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

const envPath =
  process.env.NODE_ENV === "production"
    ? "./production.env"
    : "./development.env";
dotenv.config({ path: envPath });

const contactsRoutes = require("./routes/api/contactsRoutes");

const app = express();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// MIDDLEWARE=====================================
app.use(express.json());
app.use(cors());

// ROUTES=====================================
app.use("/contacts", contactsRoutes);

/**
 * Not found request handler
 */
app.all("*", (req, res) => {
  res.status(404).json({
    msg: "Oops! Resource not found..",
  });
});

/**
 * Global error handler.
 */
app.use((error, req, res, next) => {
  res.status(500).json({
    msg: error.message,
  });
});

// SERVER INIT=======================================
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running. Use our API on port: ${port}`);
});
