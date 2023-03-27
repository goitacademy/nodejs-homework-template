const app = require("./src/app");
require("dotenv").config();
const { connectDb } = require("./src/db");
const http = require("http");

connectDb()
  .then(() => {
    const port = process.env.PORT || 3000;
    const server = http.createServer(app);

    server.listen(port, () => {
      console.log(`Database connection successful 👍.`);
      console.log(`Server is listening on port ${port} 👀`);
    });
  })
  .catch((error) => {
    console.log(`Server not running 😢. Error message: ${error.message}`);
    process.exit(1);
  });
