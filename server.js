const app = require("./app");
const connectDB = require("./db");

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to server", error);
    process.exit(1);
  });
