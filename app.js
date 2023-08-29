const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const contactsRouter = require("./routes/api/contacts.routes");
const usersRouter = require("./routes/api/users.routes");
const SRV_DB = process.env.DATABASE_URL;

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

mongoose
	.connect(SRV_DB, {
		dbName: "db-contacts",
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Database connection successful");
	})
	.catch((error) => {
		console.log("Database error message:", error.message);
		process.exit(1);
	});

require("./config/config.passport");
app.use("/api", contactsRouter);
app.use("/api", usersRouter);

app.use((req, res) => {
	res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
	res.status(500).json({ message: err.message });
});

module.exports = app;