const express = require("express");
const logger = require("morgan");
const cors = require("cors");

require("./config/passport");

const contactsRouter = require("./routes/contacts.routes");
const authRouter = require("./routes/auth.routes");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/", authRouter);
app.use(express.static("public"));

app.use((req, res) => {
	return res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
	return res.status(500).json({ message: err.message });
});

module.exports = app;
