require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

mongoose.set("strictQuery", true);

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// Middleware для проверки отсутствия поля "favorite"
app.use((req, res, next) => {
  if (req.method === "POST" && !req.body.favorite) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  next();
});
