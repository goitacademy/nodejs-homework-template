const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const connectDB = require("./models/db");

const contactsRouter = require("./routes/api/contacts");

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
});
