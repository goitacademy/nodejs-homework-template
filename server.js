const app = require("./app");

const { PORT = 3000 } = process.env;

app.listen(3000, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
