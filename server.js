const app = require("./app");
const mongoose = require("mongoose");

const { MONGO_URI, PORT } = process.env;

mongoose.set("strictQuery", false);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

console.log("1", 2);
