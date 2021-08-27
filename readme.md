## GoIT Node.js Course Template Homework

Выполните форк этого репозитория для выполнения домашних заданий (2-6)
Форк создаст репозиторий на вашем http://github.com

Добавьте ментора в коллаборацию

Для каждой домашней работы создавайте свою ветку.

- hw02
- hw03
- hw04
- hw05
- hw06

Каждая новая ветка для дз должна делаться с master

После того как вы закончили выполнять домашнее задание в своей ветке, необходимо сделать пулл-реквест (PR). Потом добавить ментора для ревью кода. Только после того как ментор заапрувит PR, вы можете выполнить мердж ветки с домашним заданием в мастер.

Внимательно читайте комментарии ментора. Исправьте замечания и сделайте коммит в ветке с домашним заданием. Изменения подтянуться в PR автоматически после того как вы отправите коммит с исправлениями на github
После исправления снова добавьте ментора на ревью кода.

- При сдаче домашней работы есть ссылка на PR
- JS-код чистый и понятный, для форматирования используется Prettier

### Команды:

- `npm start` &mdash; старт сервера в режиме production
- `npm run start:dev` &mdash; старт сервера в режиме разработки (development)
- `npm run lint` &mdash; запустить выполнение проверки кода с eslint, необходимо выполнять перед каждым PR и исправлять все ошибки линтера
- `npm lint:fix` &mdash; та же проверка линтера, но с автоматическими исправлениями простых ошибок

Конспект:

<!-- Базовый метод -->
const http = require('http')

const server = http.createServer((req, res) => {
const { url } = req;
switch (url) {
case '/':
res.write('Home page');
break;
case '/contacts':
res.write('Contacts page');
break;

    default:
      res.write('Not found');
}

res.end()
})

server.listen(4000)


<!-- Через Express -->
const express = require('express');
const contacts = require('../model/contacts.json')

const app = express();

app.use((req, res, next) => {
  console.log('Midleware at first');
  next();
})

app.get('/', (req, res) => {

  res.send('<h1>Home Page</h1>')
})

app.get('/contacts', (req, res) => {
  // res.send('<h1>Contacts Page</h1>')
  res.json(contacts)
})

//мидлвар который можно ставить после методов запроса:
app.use((_, res) => {
  res.status(404).send('Not found')
})

app.listen(4000, ()=> console.log('Server is running'));