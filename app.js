const express = require("express");
const cors = require("cors");
const routerApi = require("./routes/api/user");
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const app = express();
app.use(express.json());
app.use(cors());
require("./config/config-passport");
app.use("/api", routerApi);

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: `Not such route`,
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`Server is starting on ${PORT} PORT`);
});
