const app = require("./app");

const mongoose = require("mongoose");
const mongoDBUrl =
  "mongodb+srv://OlenaDidkivska:QdExpSeWlnyslw7f@project0.bmpdr43.mongodb.net/test";

  mongoose.Promise = global.Promise;
  
const main = async() => {
  // подключемся к базе данных
  mongoose.set("strictQuery", false);
  await mongoose.connect(mongoDBUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }, () => {
  console.log("Database connection successful");
});
}
// запускаем подключение и взаимодействие с базой данных
main().catch(console.log);

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});
