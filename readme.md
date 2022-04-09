## GoIT Node.js Course Template Homework

Выполните форк этого репозитория для выполнения домашних заданий (2-6) Форк
создаст репозиторий на вашем http://github.com

Добавьте ментора в коллаборацию

Для каждой домашней работы создавайте свою ветку.

- hw02
- hw03
- hw04
- hw05
- hw06

Каждая новая ветка для дз должна делаться с master

После того как вы закончили выполнять домашнее задание в своей ветке, необходимо
сделать пулл-реквест (PR). Потом добавить ментора для ревью кода. Только после
того как ментор заапрувит PR, вы можете выполнить мердж ветки с домашним
заданием в мастер.

Внимательно читайте комментарии ментора. Исправьте замечания и сделайте коммит в
ветке с домашним заданием. Изменения подтянуться в PR автоматически после того
как вы отправите коммит с исправлениями на github После исправления снова
добавьте ментора на ревью кода.

- При сдаче домашней работы есть ссылка на PR
- JS-код чистый и понятный, для форматирования используется Prettier

### Команды:

- `npm start` &mdash; старт сервера в режиме production
- `npm run start:dev` &mdash; старт сервера в режиме разработки (development)
- `npm run lint` &mdash; запустить выполнение проверки кода с eslint, необходимо
  выполнять перед каждым PR и исправлять все ошибки линтера
- `npm lint:fix` &mdash; та же проверка линтера, но с автоматическими
  исправлениями простых ошибок

## Routes:

### Contacts:

#### GET - http://localhost:8083/api/contacts/ --- Get All contacts.

#### GET - http://localhost:8083/api/contacts/:contactId --- Get contact by id ID.

#### POST - http://localhost:8083/api/contacts/ --- Add new contact.

#### DELETE - http://localhost:8083/api/contacts/:contactId --- Remove contact by ID.

#### PUT - http://localhost:8083/api/contacts/:contactId --- Update contact by ID.

#### PATCH - http://localhost:8083/api/contacts/:contactId/favorite --- Update status "favorite" of contact by ID.

### Auth:

#### POST - http://localhost:8083/api/auth/signup --- User registration.

#### POST - http://localhost:8083/api/auth/login --- Login user.

#### GET - http://localhost:8083/api/auth/logout --- User logging out.

### Users:

#### GET - http://localhost:8083/api/users/current --- Information about current user.

#### PATCH - http://localhost:8083/api/users/:userId/subscription --- Update the user's "subscription".

### Query:

#### GET - http://localhost:8083/api/contacts?query --- Get All contacts by query.

#### page = number.

- Choose from which page to show users: "page=1"

#### limit = number.

- Select the number of users to display: "limit=10"

#### sortByAsc = tag.

- Sort by "tag" in ascending order: "sortByAsc=phone"

#### sortByDesc = tag.

- Sort by "tag" in descending order: "sortByDesc=phone"

#### filter = tag1|tag2|tag3.

- Sort by "tags": "filter=name|age|date".

#### favorite = bool.

- Filter users by tag "favorite": "favorite=true" || "favorite=false" .

Random query string:
http://localhost:8083/api/contacts?page=2&limit=5&filter=phone|favorite|name|email&favorite=true&sortByDesc=phone
