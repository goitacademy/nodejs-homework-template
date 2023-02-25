require("dotenv").config();
const { PORT = 3000 } = process.env;

const app = require("./app");

app.listen(PORT, () => {
  console.log(`It's alive!!!! (Server running. Use this API on port: ${PORT})`);
});
