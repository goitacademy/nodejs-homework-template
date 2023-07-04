const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");

colors.setTheme({
  success: "cyan",
  error: "red",
});

dotenv.config({ path: "./config/config.env" });
const connectDB = require("./config/conn.js");
connectDB();

const app = express();

const contactsRouter = require("./routes/api/contacts.js");
const usersRouter = require("./routes/api/users.js");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
  console.log("Not found".error);
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Internal Server Error" } = err;
  res.status(status).json({ message });
  console.error(err.message.error);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running. Use our API on port: ${process.env.PORT}`);
});
