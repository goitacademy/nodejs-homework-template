const express = require("express");
const cors = require("cors");
const moment = require("moment");
const fs = require("fs/promises");

const {
  userMiddleare,
  depositMiddleare,
  rollbackMiddleare,
} = require("./middlewares/validationMiddleware");
const { authMiddleware } = require("./middlewares/authMiddleware");

const gameRouter = require("./routes/gameRouter");
const tokenRouter = require("./routes/tokenRouter");
const depositRouter = require("./routes/depositRouter");
const registrationRouter = require("./routes/registrationRouter");
const rollbackRouter = require("./routes/rollbackRouter");

const app = express();
app.use(cors());
app.use(express.json());
app.use(async (req, res, next) => {
  const { method, url } = req;
  const data = moment().format("DD-MM-YYYY_hh:mm:ss");
  await fs.appendFile("server.log", `\n${method} ${url} ${data}`);
  next();
});

app.use("/registration", userMiddleare, registrationRouter);
app.use("/token", userMiddleare, tokenRouter);
app.use("/deposit", authMiddleware, depositMiddleare, depositRouter);
app.use("/rollback", authMiddleware, rollbackMiddleare, rollbackRouter);
app.use("/game", authMiddleware, gameRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message });
// });

module.exports = app;
