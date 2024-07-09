const mongoose = require("mongoose");
const app = require("./app");

const uriDb = process.env.DB_HOST;
const PORT = process.env.PORT || 3000;

mongoose
  .connect(uriDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error.message);
    process.exit(1);
  });
