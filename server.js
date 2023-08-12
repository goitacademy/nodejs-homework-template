const { mongoose } = require("mongoose");
const app = require("./app");

const PORT = 3001
const DB_HOST =
  "mongodb+srv://Vlad-dyadya:JT6AvmjNI3WehBf6@cluster0.ohx0zsm.mongodb.net/contacts_reader?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("connect seccesfull");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
