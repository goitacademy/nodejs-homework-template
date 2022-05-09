const app = require("./app");
const { connectMongo } = require("./db/connections");

const PORT = process.env.PORT || 3000;

const main = async () => {
  try {
    await connectMongo();
    console.log("Database connection successful")
    app.listen(PORT, (err) => {
      if (err) console.error("Error at aserver launch:", err);
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (err) {
    console.log(`Failed to launch applicatin with error ${err.message}`);
    process.exit(1);  
  }
};

main();
