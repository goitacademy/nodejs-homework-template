const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const { connectDatabase } = require("./startup/database.js");

connectDatabase();
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(express.json());
app.use(cors());

const contactsRouter = require("./routes/api/contacts");
app.use("/api/contacts", contactsRouter);



 app.use((req, res) => {
  res.status(404).json({
    message: "Use api on routes: /api/contacts",
    data: "Not found",
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    data: "Internal Server Error",
  });
});



const port = 3000;
app.listen(port, () => {
    console.log('Server is listening on port ' + port);
});