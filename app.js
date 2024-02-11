const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const contactsRouter = require("./routes/api/contacts");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const db = mongoose.connect("");

db.then(() => {
	console.log("db is running");
}).catch((error) => console.log(error));

app.use(express.urlencoded());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
	res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
	res.status(500).json({ message: err.message });
});

module.exports = app;
