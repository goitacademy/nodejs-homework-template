const app = require("./app");
const { connectMongo } = require("./db/connection");

const PORT = process.env.PORT || 8082;

const start = async () => {
 try {
  await connectMongo();

  app.listen(PORT, (err) => {
   if (err) {
    console.error("Error at a server launch:", err);
   }
   console.log(`Server running. Use our API on port: ${PORT}`);
  });
 } catch (arror) {}
};

start();
