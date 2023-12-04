const mongoose = require("mongoose");                    // імпортуємо mongoose для підключення до баз даних

const DB_HOST = "mongodb+srv://Ruslana:SW0RoWplPF2dslM5@cluster1.h413iqj.mongodb.net/db_contacts?retryWrites=true&w=majority";
mongoose.set("strictQuery", true);                       // підключаємося

const app = require("./app");

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);                                    // запускаємо сервер
    console.log("Database connection successful");
  })
  .catch((error) => { 
    console.log(error.message);
    process.exit(1);                          // команда закриває запущені процеси (якщо щось запущене)
  })


// створюємо проект на mongodb.com, налаштовуємо, створюємо користувача
// в MongoDb Compas підключаємось до проекту через строку з паролем
// в проекті visual studio: підключаємо mongoose  
// заливаємо на гіт хаб а задеплоїти на render.com