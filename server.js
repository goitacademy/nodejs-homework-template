const app = require("./app");
const { dbConnection } = require("./db/db-connection");
const PORT = process.env.PORT;

const start = async () => {
  await dbConnection();

  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
};

start();
