const express = require("express");
const cors = require("cors");
const contactsRouter = require("./routes/api/contacts");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

module.exports = app;

// const express = require("express");
// const logger = require("morgan");
// const cors = require("cors");
// const mongoose = require("mongoose");

// mongoose
//   .connect(
//     "mongodb+srv://kowalewiczkarol:secGUZy3RZUGMwOv@cluster0.ivmgw57.mongodb.net/mydb",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error);
//   });

// const contactsRouter = require("./routes/api/contacts");

// const app = express();

// const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// app.use(logger(formatsLogger));
// app.use(cors());
// app.use(express.json());

// app.use("/api/contacts", contactsRouter);

// app.use((req, res) => {
//   res.status(404).json({ message: "Not found" });
// });

// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message });
// });

// module.exports = app;
