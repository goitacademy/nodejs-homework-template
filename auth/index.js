// const express = require("express");
// const authRouter = require("./routes/api/authRoutes");

// const app = express();

// app.use('/api/auth', authRouter);

// module.exports = app;


// Крок 1

// У коді створи схему і модель користувача для колекції users.

// {
//   password: {
//     type: String,
//     required: [true, 'Set password for user'],
//   },
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//   },
//   subscription: {
//     type: String,
//     enum: ["starter", "pro", "business"],
//     default: "starter"
//   },
//   token: String
// }
// Змініть схему контактів, щоб кожен користувач бачив тільки свої контакти. Для цього в схемі контактів додайте властивість

//     owner: {
//       type: Schema.Types.ObjectId,
//       ref: 'user',
//     }
// Примітка: 'user' - назва колекції, у якій зберігаються користувачі

// Крок 2

// Регістрація

// Створити ендпоінт /users/register

// Зробити валідацію всіх обов'язкових полів (email і password). При помилці валідації повернути Помилку валідації.

// У разі успішної валідації в моделі User створити користувача за даними, які пройшли валідацію. Для засолювання паролів використовуй bcrypt або bcryptjs

// Якщо пошта вже використовується кимось іншим, повернути Помилку Conflict.
// В іншому випадку повернути Успішна відповідь.
// Registration request

// POST /users/register
// Content-Type: application/json
// RequestBody: {
//   "email": "example@example.com",
//   "password": "examplepassword"
// }
// Registration validation error

// Status: 400 Bad Request
// Content-Type: application/json
// ResponseBody: <Помилка від Joi або іншої бібліотеки валідації>
// Registration conflict error

// Status: 409 Conflict
// Content-Type: application/json
// ResponseBody: {
//   "message": "Email in use"
// }
// Registration success response

// Status: 201 Created
// Content-Type: application/json
// ResponseBody: {
//   "user": {
//     "email": "example@example.com",
//     "subscription": "starter"
//   }
// }
