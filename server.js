const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = 3000;
const DB_HOST = `mongodb+srv://admin:240188Lusiy@cluster0.gwfkspe.mongodb.net/test`;

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.get("/", async (req, res) => {
  console.log(req.body);
  res.status(200).json("Server started");
});

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/tasks",
    data: "Not found",
  });
});

app.use((err, _, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

async function startApp() {
  try {
    mongoose.connect(DB_HOST, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(PORT, () =>
      console.log(`Server running. Use our API on http://localhost:${PORT}`)
    );
  } catch (e) {
    console.log(`Server not running. Error message: ${e}`);
  }
}
startApp();
