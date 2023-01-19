const app = require("./app");
require("dotenv").config({ path: `${__dirname}/.env` });
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running. Use our API on port: http://localhost:${port} `);
});
