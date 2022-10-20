const app = require("./app");
const mongoose = require("mongoose");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(PORT))
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

// jiR0EMuehvF3K5bb
