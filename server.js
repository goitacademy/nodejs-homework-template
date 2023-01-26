const app = require("./app");
const { connectMongo } = require("./db/connection");

const PORT = process.env.PORT || 8081;

const start = async () => {
  await connectMongo();
  app.listen(PORT, (err) => {
    if (err) {
      console.log(`Err at server launch:`, err);
    }
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
};
start();
