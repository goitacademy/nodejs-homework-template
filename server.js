const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");
const contactsRouter = require("./routes/api/contacts");
const path = require("path");
const usersRouter = require("./routes/api/users");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use(express.static(path.join(__dirname, "public")));

app.use("/avatars", express.static("public/avatars"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
