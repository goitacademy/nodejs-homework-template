const express = require("express");
const cors = require("cors");

require("colors");
require("dotenv").config();

const connectDB = require("./database/connection");

const app = express();

const PORT = process.env.PORT || 5050;

// parse application/json
app.use(express.json());
// cors
app.use(cors());

const contactsRouter = require("./routes/api/contacts");
app.use("/api", contactsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  console.log("404: Not found");
  res.status(404).json({ status: "error", code: 404, message: "Not found" });
  next();
});

// error handler
app.use((err, req, res, next) => {
  console.log("status 500");
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
  next();
});

app.listen(PORT, async () => {
  console.log("db connecting...".bgGray.bold.italic);
  await connectDB();
  console.log(
    `Database connection successful on port: ${PORT}`.bgGreen.bold.italic
  );
});
