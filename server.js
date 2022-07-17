



const app = require('./app');
const { PORT } = require('./port');
app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
// const app = require("./app");

// const { PORT = 5500 } = process.env;

// app.listen(PORT, () => {
//   console.log(`Server running. Use our API on port: ${PORT}`);
// });