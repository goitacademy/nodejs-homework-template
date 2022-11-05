

const mongoose = require('mongoose');
const HOST_DB = "mongodb+srv://user21:8h8HBvPqwaMy1dCa@cluster0.zob5egp.mongodb.net/db-contacts";
const PORT = 3000;
const app = require('./app');


async function main() {
  try {
    if (!HOST_DB) {
      throw new Error("HOST_DB Not send");
    }
    await mongoose.connect(HOST_DB);
    console.log("Database connection successful")
    app.listen(3000, () => {
      console.log(PORT)
    })
  } catch (err) {
    console.log({ "Error": err.message });
    process.exit(1)
  }
}
main()
