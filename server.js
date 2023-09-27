const app = require("./app");
const authRoutes = require("./routes/api/auth");
const mongoose = require("mongoose");

app.use("/api/auth", authRoutes);

mongoose
  .connect(
    "mongodb+srv://kowalewiczkarol:secGUZy3RZUGMwOv@cluster0.ivmgw57.mongodb.net/mydb",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
