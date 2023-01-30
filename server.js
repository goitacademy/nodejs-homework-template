const app = require("./app");
// require("dotenv").config();

// npm install dotenv --save
// PORT=3000
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log("Server running. Use our API on port: `${PORT}`");
// });

app.listen(3002, () => {
  console.log("Server running. Use our API on port: 3002");
});
