const express = require("express");
const { json } = require("express");
const logger = require("morgan");
const cors = require("cors");

const authRouter = require("./routes/api/auth.js");

const contactsRouter = require("./routes/api/contacts-router.js");
require("dotenv").config();

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// const decodedToken = jwt.decode(token);
// console.log(decodedToken);

// try {
//   const { id } = jwt.verify(token, SECRET_KEY);
//   const invalidToken =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NmM2NGY1MDcxNDMyYWQ1YzczYzdmMyIsImlhdCI6MTY4NTU3MDQ1NywiZXhwIjoxNjg1OTMwNDU3fQ.pbKstUF7QU_OLA77Fdi7zIpLwf-xYLIxyLTqsN75BIA";
//   const result = jwt.verify(invalidToken, SECRET_KEY);
//   console.log(id);
//   console.log(result);
// } catch (error) {
//   console.log(error.message);
// }

app.use(logger(formatsLogger));
app.use(cors());
app.use(json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
