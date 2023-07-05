const mongoose = require("mongoose");
const app = require('./app');

const { DP_HOST, PORT = 3000 } = process.env;

mongoose.connect(DP_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  
  })


