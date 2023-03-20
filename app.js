const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

// const authRouter = require("./routes/api/auth");
const { contactsRouter, authRouter, usersRouter } = require("./routes");

const app = express();

// const createHashPassword = async (password) => {
//   const result = await bcrypt.hash(password, 10);
//   const compareResult = await bcrypt.compare(password, result);
// };

// const { SECRET_KEY } = process.env;
// const payload {
//   id: ""
// };

// const token = jwt.sign(payload, SECRET_KEY, { expireIn: "23" })

// const decodeToken = jwt.decode(token);

// try {
//   const { id } = jwt.verify(token, SECRET_KEY)
//   const invalidToken = ""
//   const result = jwt.verify(invalidToken, SECRET_KEY)
// }
// catch (error) { };

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _, res, next) => {
  const { status = 500, message = "Server error!" } = err;
  res.status(status).json({ message });
});

module.exports = app;
