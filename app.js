const express = require('express'); // Express - фреймворк для создания веб-серверов и API на Node.js
const logger = require('morgan'); // Middleware для вывода в консоль HTTP-запросов
const cors = require('cors'); // Middleware для обработки CORS (Cross-Origin Resource Sharing) в Express


const contactsRouter = require('./routes/api/index')

const app = express() // app - наш веб-сервер  //Вызываем его как функцию



const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'


// !app.use() в Express используется middleware. Эти функции могут обрабатывать запросы, модифицировать объекты запросов и ответов или выполнять аутентификацию. Они принимают три аргумента: req (запрос), res (ответ) и next (следующая функция middleware).
app.use(logger(formatsLogger))

app.use(cors()); //позволяет запросы с любого источника

/* app.use(cors({ // разрешает запросы только с "http://localhost:3000"
  origin:"http://localhost:3000",
  optionsSuccessStatus: 200
})) */



app.use(express.json()) //позволяет Express обрабатывать входящие запросы в формате JSON, преобразуя их тело в объект JavaScript для дальнейшей обработки. Действует глобально, что не всегда хорошо  если нужно локально, то смотри пример дальше
// !Для локального использования
// const jsonParser = express.json() //и теперь используем как второй аргумент по такому примеру:
// router.post('/', jsonParser, ctrl.addContact)

app.use('/api', contactsRouter) //все запросы, начинающиеся с /api/contacts, будут передаваться в contactsRouter для обработки


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
