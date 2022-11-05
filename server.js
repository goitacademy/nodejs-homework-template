
const mongoose = require('mongoose');
const app = require('./app');
const { HOST_DB, PORT = 3000 } = process.env;

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
