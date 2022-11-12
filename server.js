const app = require("./app");
const { connectMongo } = require("./connections/connetctionDB");
require("dotenv").config();
const PORT = process.env.PORT || 5054;
const serverStart = async () => {
  try {
    await connectMongo();
    app.listen(PORT, (err) => {
      if (err) console.error("Error at launch", err);
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (err) {
    console.error(`Failed to launch ${err.message}`);
  }
};
serverStart();
