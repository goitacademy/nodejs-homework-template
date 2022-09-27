const app = require("./app");
require("dotenv").config();

const { PORT = 4000 } = process.env;

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
