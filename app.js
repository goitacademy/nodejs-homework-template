const express = require("express");
const cors = require("cors");
const { usersRouter } = require("./users/users.router");

const app = express();

// parse application/json
app.use(express.json());
// cors
app.use(cors());

app.use("/api/contacts", usersRouter);

app.use((_, res) => {
  return res.status(404).send({ message: "Use api on routes: /api/contacts" });
});

app.use((err, _, res, __) => {
  console.log(err.stack);
  return res.status(500).send({ message: err.message });
});

module.exports = {
  app,
};
