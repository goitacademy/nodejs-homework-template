const app = require("./app");
const { connectMongo } = require("./models");

const PORT = process.env.PORT || 3000;

async function main() {
  await connectMongo();
  console.log("MongoDB conected!!!");

  app.listen(PORT, (err) => {
    if (err) {
      console.log(err.message);
    }
    console.log(`Server running. Use our API on port:${PORT}`);
  });
}

main().catch((error) => console.log(error.message));
