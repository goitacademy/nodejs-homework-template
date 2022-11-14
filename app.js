const express = require("express");
const { contactsRouter } = require("./routes/contactsRoute");
const { userRouter } = require("./routes/userRouter");

const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  return res.status(404).json({ message: "Not Found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server Internal error" } = err;
  res.status(status).json({ message });
});

module.exports = {
  app,
};




