const app = require("./app");
require("dotenv").config();

const PORT = process.env.API_SERVER_PORT;

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
