const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
// require('dotenv').config();

const app = express();

// const {router} = require("./src/routes/api/contacts");
// const PORT = process.env.PORT;

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
// app.use(router);

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});