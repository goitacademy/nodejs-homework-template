const { default: mongoose } = require("mongoose");
const app = require("./app");

const {
  MONGO_DB_USER,
  MONGO_DB_PASSWORD,
  MONGO_DB_HOST,
} = require("./constants/env");

app.listen(`${MONGO_DB_HOST}`, async () => {
  try {
   const res =  await mongoose.connect(
        `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@cluster0.vhfugis.mongodb.net/`
    );
    console.log("Database connection successful", res);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
});
