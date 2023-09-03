const mongoose = require("mongoose");
const app = require("./app");


const { DB_HOST, PORT = 3000 } = process.env;
console.log("DB_HOST", DB_HOST);
mongoose.connect(DB_HOST)

  .then(() => {
    app.listen(3000, () => {
      console.log(`Server running. Use our API on port:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
