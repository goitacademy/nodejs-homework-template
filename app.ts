const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const limiter = require("./middleware/rate-limit");
const { MAX_REQ_BODY_SIZE } = require("./libs/constants");

const authRouter = require("./routes/api/auth");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(limiter(15 * 60 * 1000, 100)); // Apply the rate limiting middleware to all requests
app.use(helmet());

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: MAX_REQ_BODY_SIZE.LIMIT }));

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export default app;
