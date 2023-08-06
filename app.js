const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
// const express = require("express");
// const app = express();
// app.use((req, res, next) => {
//   console.log("Наше проміжне ПЗ");
//   next();
// });
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.get("/contact", (req, res) => {
//   res.send("<h1>Contact page</h1>");
// });
// app.listen(3000, () => {
//   console.log("Example app listening on port 3000!");
// });
