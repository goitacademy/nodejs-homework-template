const mongoose = require("mongoose");

const app = require("./app");
const {DB_HOST, PORT } = process.env;

mongoose.set("strictQuery", true);

mongoose
  // eslint-disable-next-line no-undef
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
  console.log("Server running. Use our API on port: 3000")
})
.catch(error => { 
  console.log(error.message);
  process.exit(1);
});






