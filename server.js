const app = require("./app");
const setupMongoConnection = require("./utils/setupMongoConnections");

setupMongoConnection().then(() =>
  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000");
  })
);
