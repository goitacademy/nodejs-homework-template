require("dotenv").config();

const app = require("../app");
const { connectMongo } = require("../src/db/conections");

const PORT = process.env.PORT || 3000;

const starts = async () => {
  try {
    await connectMongo();
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(`Error on server start ${error.message}`);
  }
};
starts();
