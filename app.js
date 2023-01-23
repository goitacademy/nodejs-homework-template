const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts');

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
app.use(logger(formatsLogger))
app.use(cors())

app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
    // задаємо дефолтні значення для об'єкту помилку і якщо буде помилка з іншим статусом чи повідомленням - перезапишемо
    const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: message })
})

module.exports = app;




// // Original + comments======================================================================
// // express - пакет необхідний для роботи з HTTP(request, response) та дозволяє створити сервер з інструкціями:
// // "що робити при певному запиті та яку відповідь надати фронту"
// const express = require('express')
// // імпортуємо пакет morgan (ще одна maddleware, яка виводить до консолі запити)
// const logger = require('morgan')
// // щоб отримати можливість робити кросдоменні запити(з одного сайту на інший) на етапі - імпортуємо пакет cors
// // оскільки по дефолту сервер забороняє будь-які запити з інших доменів(сайтів), але на етапі розробки фронт та бек мають різні домени,
// // і для розробника це незручно
// const cors = require('cors')

// // експортуємо сюди сторінку з оброблювачами (для різних запитів)
// const contactsRouter = require('./routes/api/contacts');

// // щоб створити сервер, потрібно викликати express як функцію, тобто app - і буде сервером
// const app = express()

// // визначаємо спосіб виводу інфи (dev - повноцінна інфа, short - в короткій формі)
// const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
// // передаємо інфу в logger
// app.use(logger(formatsLogger))
// // використовуємо cors як middleawre при роботі сервера
// app.use(cors())

// // middleware express.json() - перевіряє всі вхідні запити на сервер і якщо тіло запиту приходить в JSON-форматі, то ця мідлвар 
// // трансформує JSON до об'єкта і записує його до request.body
// app.use(express.json())

// // якщо на початку такий маршрут - '/api/contacts', то ф-ї, що будуть оброблювати його запити будуть на сторінці contactsRouter,
// // а вже всі методи будемо розписувати у файлі routes/api/contacts.js 
// app.use('/api/contacts', contactsRouter)

// app.use((req, res) => {
//   res.status(404).json({ message: 'Not found' })
// })

// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message })
// })

// module.exports = app;





// EXAMPLES================================================================================================================
// // express - пакет необхідний для роботи з HTTP(request, response) та дозволяє створити сервер з інструкціями:
// // "що робити при певному запиті та яку відповідь надати фронту"
// const express = require('express')
// const contacts = require('./models/contacts.json');
// // щоб створити сервер, потрібно викликати express як функцію, тобто app - і буде сервером
// const app = express();
// // щоб отримати можливість робити кросдоменні запити(з одного сайту на інший) на етапі - імпортуємо пакет cors
// // оскільки по дефолту сервер забороняє будь-які запити з інших доменів(сайтів), але на етапі розробки фронт та бек мають різні домени,
// // і для розробника це незручно
// const cors =  require("cors");

// // використовуємо cors як middleawre при роботі сервера
// app.use(cors());


// // Також за допомогою метода use можемо використати middleware перед запитом (обов'язково перед запитом)==========================
// // і будь-який наш запит обо'язково буде пропоходити через middleware=============================================================
// // app.use((request, response, next) => {
// //     console.log("first middlaware");
// //     // необхідно вказати next, щоб запити що знаходяться нижче спрацювали
// //     next();
// // })

// // app.use((request, response, next) => {
// //     console.log("second middlaware");
// //     next();
// // })

// // даний middleware при кожному запиті буде записувати до файлу fileRegister.log дату
// // const fs = require("fs/promises");
// // const moment = require("moment");

// // app.use(async (req, res, next) => {
// //     // беремо методи з об'єкту запиту
// //     const { method, url } = req;
// //     // date - беремо з бібліотеки
// //     const date = moment().format("DD-MM-YYY_hh:mm:ss");
// //     // записуємо до файлу fileRegister.log нову дату при кожному запиті(оновленні)
// //     await fs.appendFile("fileRegister.log", `\n${method} ${url} ${date}`);
// //     next();
// // })
// // =========================================================================================================================

// // тепер потрібно прописати інструкції для сервера
// // 1. якщо на сервер прийде GET запит за адресою /contacts, то потрібно виконати наступну функцію (request, response),
// // де request об'єкт з усією інфою для запиту: певний метод(get, post, put....), url та додаткові інструкції
// // response - відповідь, яку надасть сервер
// app.get("/contacts", (request, response) => {
//     // console.log(request.url);
//     // console.log(request.method);
//     // console.log(request.headers);

//     // більш правильно замість response.send виkористовувати response.json (дозволяє додадати додаткові налаштування) та
//     // повертати біль складні об'єкти
//     // response.send - краще використовувати, коли ми повертаємо розмітку (невелику кількість)
//     // response.send(contacts);
//     response.json(contacts);
// })

// module.exports = app;










