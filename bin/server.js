const app = require("../app");

const db = require("../model/db"); // подключаем db из файла model/db.js

const PORT = process.env.PORT || 3000;

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  }); // сервер запускаем только после того как подключили базу данных
}).catch((e) => {
  console.log(`Error: ${e.message}`);
});
