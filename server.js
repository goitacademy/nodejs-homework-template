const app = require("./app");
const { MONGO_URL } = process.env;

const mongoose = require("mongoose");

main().catch((err) => console.log(err));

const { PORT = 3000 } = process.env;

async function main() {
  await mongoose
    .set("strictQuery", true)
    .connect(MONGO_URL)
    .then(() => app.listen(PORT), console.log("Database connection successful"))

    .catch((error) => {
      console.log(error.messege);
      process.exit(1);
    });

  // useNewUrlParser: true,
  // useUnifiedTopology: true,
}

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });
