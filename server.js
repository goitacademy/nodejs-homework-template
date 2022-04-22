const app = require("./app");
require("dotenv").config();

app.listen(3000, () => {
  console.log(process.env.NODE_ENV);
  console.log("Server running. Use our API on port: 3000");
});

// const express = require("express");
// const app = express();
// const path = require("path");
// app.use((req, res, next) => {
//   console.log("Наше промежуточное ПО");

//   next();
// });
// app.use(express.urlencoded({ extended: false }));
// app.get("/login", (req, res) => {
//   res.send(`<form action="/login" method="POST">
//   <label for="email">Email</label>
//   <input type="text" name="email" id="email" />
//   <label for="password">Пароль</label>
//   <input type="password" name="password" id="password" />
//   <button type="submit">Войти</button>
// </form>`);
// });
// app.post("/login", (req, res, next) => {
//   const { email, password } = req.body;
//   // console.log(req);
//   console.log(req.body);
// });
// app.get("/contact/:id", (req, res) => {
//   console.log(req.query);
//   res.send(`<h1>Contact</h1> Параметр: ${req.params.id}`);
// });

// app.listen(3000, () => {
//   console.log("Example app listening on port 3000!");
// });
