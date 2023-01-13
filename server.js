require("dotenv").config();
const app = require("./app");
// const port = process.PORT;
app.listen(process.env.PORT, () => {
  console.log("Server running. Use our API on port: 3000");
});
