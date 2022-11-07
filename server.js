// const app = require('./app')
require("dotenv").config();
// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })
const app = require("./app");
const db = require("./models/db");
// const PORT = 3333;
const PORT = process.env.PORT || 3333;

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((err) => {
  console.log(`Server not running. Error message: ${err.message}`);
  process.exit(1);
});
// app.listen(PORT, () => {
//   console.log(`Server running. Use our API on port: ${PORT}`);
// });
console.log("process:", process.env.PORT);
