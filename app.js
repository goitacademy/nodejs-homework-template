const express = require('express'); // Express - фреймворк для создания веб-серверов и API на Node.js
const logger = require('morgan'); // Middleware для вывода в консоль HTTP-запросов
const cors = require('cors'); // Middleware для обработки CORS (Cross-Origin Resource Sharing) в Express


const contactsRouter = require('./routes/api/contacts')

const app = express() // app - наш веб-сервер  //Вызываем его как функцию



const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'


// !app.use() в Express используется middleware. Эти функции могут обрабатывать запросы, модифицировать объекты запросов и ответов или выполнять аутентификацию. Они принимают три аргумента: req (запрос), res (ответ) и next (следующая функция middleware).
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter) //все запросы, начинающиеся с /api/contacts, будут передаваться в contactsRouter для обработки


// !обрабатывает запросы, попавшие на несуществующие страницы или маршруты в вашем Express-приложении.
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})


// !используется для обработки ошибок
app.use((err, req, res, next) => {
  const {status = 500, message = 'Server error'} = err
  res.status(status).json({ message })
})


// Пример мидлвэр - функции, которая обрабатывает запрос на /contacts
/* app.get("/contacts", (request, response)=>{
  console.log(request.url); // Выводит URL запроса
  console.log(request.method); // Выводит HTTP метод запроса
}
) */



module.exports = app
