const express = require("express");
const { usersRouter } = require("./users/users.router");

const app = express();

app.use(express.json());

app.use("/users", usersRouter);

app.use((err, _, res, __) => {
  return res.status(500).send({ message: err.message });
});

module.exports = {
  app,
};
