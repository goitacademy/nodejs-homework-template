const app = require("./app");
require("colors");
const connectDB = require("./config/connectDB");

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`.green.bold.italic);
});
