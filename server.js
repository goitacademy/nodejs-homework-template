const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const contactsRouter = require("./routes/api/contacts");
const configPath = path.join(__dirname, ".", "config", ".env");

dotenv.config({ path: configPath });
console.log(dotenv.config({ path: configPath }));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", require("./routes/api/contacts"));

app.listen(process.env.PORT, () => {
  console.log("Server running. Use our API on port: 3000");
});
