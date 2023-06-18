const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// Welcome page

app.get("/", (req, res) => {
	res.send('WELCOME TO THE MAIN PAGE. Path to contact is "/api/contacts"');
});

// Router

const contactsRouter = require("./routes/api/contacts.js");
const userRouter = require("./routes/api/users.js");

app.use("/api/contacts", contactsRouter);
app.use("/api/users", userRouter);

// Conection to data base

const BASE_URI = process.env.BASE_URI;

const connection = mongoose.connect(BASE_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

connection
	.then(() => {
		app.listen(function () {
			console.log(`Server running. Database connection successful`);
		});
	})
	.catch((err) => {
		console.log(`Server not running. Error message: ${err.message}`);
		process.exit(1);
	});

// Middleware

// app.use((req, res, next) => {
// 	console.log("Nasze oprogramowanie pośredniczące");
// 	next();
// });

// Error response

app.use((req, res) => {
	res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
	res.status(500).json({ message: err.message });
});

module.exports = app;
