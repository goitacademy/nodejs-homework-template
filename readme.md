## HW-06

```
npm install @sendgrid/mail
```

2. Створюємо `sendEmail.js`

3. Додамо нове поле в моделі Юзер:

```
https://temp-mail.org/uk/
```

## HW-05

Продовж створення REST API для роботи з колекцією контактів. Додай можливість завантаження аватарки користувача через [Multer] (https://github.com/expressjs/multer).

### Крок 1

Створи папку `public` для роздачі статики. У цій папці зроби папку avatars. Налаштуй **Express** на роздачу статичних файлів з папки `public`.

Поклади будь-яке зображення в папку `public/avatars` і перевір, що роздача статики працює. При переході по такому URL браузер відобразить зображення.

`Shell http://locahost:<порт>/avatars/<ім'я файлу з розширенням> `

---

```js
npm install multer
```

### Крок 2

У схему користувача додай нову властивість avatarURL для зберігання зображення.

```
{
...
avatarURL: String,
...
}
```

Використовуй пакет gravatar для того, щоб при реєстрації нового користувача відразу згенерувати йому аватар по його email.

---

```js
$ npm install gravatar
```

### Крок 3

При реєстрації користувача:

Створюй посилання на аватарку користувача за допомогою `gravatar`
Отриманий URL збережи в поле `avatarURL` під час створення користувача

```js
http://localhost:3000/api/users/register

{
  "password": "werty45345",
  "email": "werty@gmail.com"
}
```

### Крок 4

Додай можливість поновлення аватарки, створивши ендпоінт `/users/avatars` і використовуючи метод `PATCH`.

avatar upload from postman

```
# Запит

PATCH /users/avatars
Content-Type: multipart/form-data
Authorization: "Bearer {{token}}"
RequestBody: завантажений файл

# Успішна відповідь

Status: 200 OK
Content-Type: application/json
ResponseBody: {
"avatarURL": "тут буде посилання на зображення"
}

# Неуспішна відповідь

Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
"message": "Not authorized"
}
```

- Створи папку `tmp` в корені проекту і зберігай в неї завантажену аватарку.
- Оброби аватарку пакетом jimp і постав для неї розміри 250 на 250
  Перенеси аватарку користувача з папки tmp в папку public/avatars і дай їй унікальне ім'я для конкретного користувача.
- Отриманий URL /avatars/<ім'я файлу з розширенням> та збережи в поле avatarURL користувача

---

```js
npm install jimp
```

```
Align Mode	                           Axis Point
Jimp.HORIZONTAL_ALIGN_LEFT	Positions the x-axis at the left of the image
Jimp.HORIZONTAL_ALIGN_CENTER	Positions the x-axis at the center of the image
Jimp.HORIZONTAL_ALIGN_RIGHT	Positions the x-axis at the right of the image
Jimp.VERTICAL_ALIGN_TOP	Positions the y-axis at the top of the image
Jimp.VERTICAL_ALIGN_MIDDLE	Positions the y-axis at the center of the image
Jimp.VERTICAL_ALIGN_BOTTOM	Positions the y-axis at the bottom of the image
```

```js
const updateAvatar = async (req, res) => {
  // Перевірка, чи був переданий файл в запиті
  if (!req.file) {
    throw HttpError(400, "File is not found.");
  }

  // Отримання ідентифікатора користувача з об'єкта req.user
  const { _id } = req.user;
  // Отримання шляху (який тут відразу й іменуємо: 'tempUpload') та оригінального імені завантаженого файлу з об'єкта req.file
  const { path: tempUpload, originalname } = req.file;
  // Формування шляху для результату завантаження в папку з аватарами (додаючи ід та оригінальне ім'я файлу)
  const resultUpload = path.join(avatarDir, `${_id}_${originalname}`);

  // Завантаження зображення з файлу за допомогою бібліотеки Jimp
  const image = await Jimp.read(tempUpload);
  // Автоматичне обрізання та розміщення зображення для отримання кадру розміром 250x250 пікселів
  image
    // .resize(256, 256) // resize
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE) // resize
    .dither565() // згладжування зображення та зменшення колірного простору до 16 біт (RGB565)
    .quality(60) // set JPEG quality
    .write(tempUpload); // save

  // Перейменування тимчасового файлу зображення на постійне місце зберігання
  await fs.rename(tempUpload, resultUpload);
  // Формування шляху до аватара для збереження в базі даних
  const avatarURL = path.join("avatars", `${_id}_${originalname}`);

  // Оновлення інформації користувача в базі даних (вказуючи новий шлях до аватара)
  const user = await User.findByIdAndUpdate({ _id }, { avatarURL });

  // Відправлення відповіді клієнту з новим шляхом до аватара
  res.json({
    avatarURL,
  });
};
```

### Додаткове завдання - необов'язкове

#### 1. Написати unit-тести для контролера входу (логін)

За допомогою `Jest`

- відповідь повина мати статус-код 200
- у відповіді повинен повертатися токен
- у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String

## HW-04 - Аутентифікація за допомогою JSON Web Token (JWT)

Створи гілку 04-auth з гілки master.

Продовж створення REST API для роботи з колекцією контактів. Додай логіку аутентифікації / авторизації користувача через JWT.

### Крок 1

У коді створи схему і модель користувача для колекції users.

```js
{
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: String
}
```

### Step 1.1

Створюємо файл `user.js`:

```js
const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

//! === Mongoose schema ===

const userSchema = new Schema(
  {
    password: {
      type: String,
      minLength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

//! === Joi schema ===

const userJoiSchema = Joi.object({
  password: Joi.string()
    .required()
    .messages({ "any.required": "Set password for user" }),
  email: Joi.string()
    .pattern(emailRegexp) // замість стандартного - '.email()'
    .required()
    .messages({ "any.required": "Email is required" }),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter"),
});

const schemas = {
  userJoiSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
```

---

Змініть схему контактів, щоб кожен користувач бачив тільки свої контакти. Для цього в схемі контактів додайте властивість

    ```js
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
    ```

Примітка: 'user' - назва колекції, у якій зберігаються користувачі

### Крок 2

#### Регістрація

Створити ендпоінт `/users/register`

Зробити валідацію всіх обов'язкових полів (email і password). При помилці валідації повернути Помилку валідації.

У разі успішної валідації в моделі User створити користувача за даними, які пройшли валідацію. Для засолювання паролів використовуй bcrypt або bcryptjs

```js
npm install bcrypt

yarn add bcrypt
```

Якщо пошта вже використовується кимось іншим, повернути Помилку Conflict.
В іншому випадку повернути Успішна відповідь.

**Registration request**

```js
POST /users/register
Content-Type: application/json
RequestBody: {
"email": "example@example.com",
"password": "examplepassword"
}
```

**Registration validation error**

```js
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Помилка від Joi або іншої бібліотеки валідації>
```

**Registration conflict error**

```js
Status: 409 Conflict
Content-Type: application/json
ResponseBody: {
"message": "Email in use"
}
```

**Registration success response**

```js
Status: 201 Created
Content-Type: application/json
ResponseBody: {
"user": {
"email": "example@example.com",
"subscription": "starter"
}
}
```

#### Логін

Створити ендпоінт `/users/login`

В моделі User знайти користувача за email.

Зробити валідацію всіх обов'язкових полів (email і password). При помилці валідації повернути Помилку валідації.

В іншому випадку, порівняти пароль для знайденого користувача, якщо паролі збігаються створити токен, зберегти в поточному юзера і повернути Успішна відповідь.
Якщо пароль або імейл невірний, повернути Помилку Unauthorized.
**Login request**

```js
POST /users/login
Content-Type: application/json
RequestBody: {
"email": "example@example.com",
"password": "examplepassword"
}
```

**Login validation error**

```js
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Помилка від Joi або іншої бібліотеки валідації>
```

**Login success response**

```js
Status: 200 OK
Content-Type: application/json
ResponseBody: {
"token": "exampletoken",
"user": {
"email": "example@example.com",
"subscription": "starter"
}
}
```

**Login auth error**

```js
Status: 401 Unauthorized
ResponseBody: {
"message": "Email or password is wrong"
}
```

### Крок 3

#### Перевірка токена

Створи мідлвар для перевірки токена і додай його до всіх раутів, які повинні бути захищені.

- Мідлвар бере токен з заголовків `Authorization`, перевіряє токен на валідність.
- У випадку помилки повернути Помилку `Unauthorized`.
- Якщо валідація пройшла успішно, отримати з токена `id` користувача. Знайти користувача в базі даних з цим `id`.
- Якщо користувач існує і токен збігається з тим, що знаходиться в базі, записати його дані в `req.user` і викликати `next()`.
- Якщо користувача з таким id НЕ існує або токени не збігаються, повернути Помилку `Unauthorized`

  **Middleware unauthorized error**

  ```js
  Status: 401 Unauthorized
  Content-Type: application/json
  ResponseBody: {
  "message": "Not authorized"
  }
  ```

---

```js
npm install jsonwebtoken

yarn add jsonwebtoken
```

### Крок 4

#### Логаут

Створити ендпоінт `/users/logout`

Додай в маршрут мідлвар перевірки токена.

У моделі User знайти користувача за `\_id`.
Якщо користувача не існує повернути Помилку Unauthorized.
В іншому випадку, видалити токен у поточного юзера і повернути Успішна відповідь.
**Logout request**

```js
POST / users / logout;
Authorization: "Bearer {{token}}";
```

**Logout unauthorized error**

```js
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
"message": "Not authorized"
}
```

**Logout success response**

```js
Status: 204 No Content
```

### Крок 5

#### Поточний користувач - отримати дані юзера по токені

Створити ендпоінт ` `

Додай в раут мідлвар перевірки токена.

Якщо користувача не існує повернути Помилку Unauthorized
В іншому випадку повернути Успішну відповідь
**Current user request**

```js
GET / users / current;
Authorization: "Bearer {{token}}";
```

**Current user unauthorized error**

```js
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
"message": "Not authorized"
}
```

**Current user success response**

```js
Status: 200 OK
Content-Type: application/json
ResponseBody: {
"email": "example@example.com",
"subscription": "starter"
}
```

### Додаткове завдання - необов'язкове

- Зробити пагінацію для колекції контактів (GET /contacts?page=1&limit=20).
- Зробити фільтрацію контактів по полю обраного (GET /contacts?favorite=true)
- Оновлення підписки (subscription) користувача через ендпоінт PATCH /users. Підписка повинна мати одне з наступних значень ['starter', 'pro', 'business']

---

```js
const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const emailRegexp = /^\w+([\.-]?\w+)_@\w+([\.-]?\w+)_(\.\w{2,3})+$/;
// /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
// ^[_\.0-9a-zA-Z-]+@([0-9a-zA-Z][0-9a-zA-Z-]+\.)+[a-zA-Z]{2,6}$
// /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
```

---

## HW-03

**Mongoose**
бібліотека (Object Data Modelling) для роботи з MongoDB

```js
npm install mongoose -S

npm run start:dev


```

const { DB_HOST } = process.env;
// const { DB_HOST } = require("./config");

//_ На ПК немає такого ключа (властивості), який ввели на render.com:
console.log(process.env.DB_HOST);
//_ Але з'являється, коли записуємо у файл '.env' (після встановлення пакету 'dotenv')

Створимо файл `.env`:

```js
npm install dotenv
```

```
DB_HOST=mongodb+srv://Roman80:rzAnXHy4cqIPbVBh@cluster0.qwko4cb.mongodb.net/db-contacts?retryWrites=true&w=majority
PORT=3002
```

Можна відразу імпортувати і викликати:
require('dotenv').config();

https://node-hw-rest-api.onrender.com/api/contacts
https://localhost:3002/api/contacts

**Express**:

Опис: Express - це веб-фреймворк для розвитку додатків на мові JavaScript за допомогою Node.js. Він надає простий та ефективний спосіб створення веб-серверів та обробки HTTP-запитів.

Використання: Express дозволяє розробникам швидко створювати веб-додатки, визначати маршрути, обробляти запити та відправляти відповіді.

**Morgan**:

(Morgan – це мідлвара, яка виводить в консолі інформацію про запит. Для того, щоб дебажити код.)

Опис: Morgan - це middleware для обробки логування запитів HTTP. Він записує інформацію про запити, таку як метод, URL, статус, час виконання тощо.
Використання: Morgan часто використовується для відстеження дії сервера, виявлення проблем та аналізу логів для поліпшення продуктивності.

**Cors**:

Опис: CORS (Cross-Origin Resource Sharing) - це механізм, який дозволяє або обмежує запити ресурсів на веб-сторінці з іншого джерела, ніж початкова сторінка.

Використання: Cors використовується для вирішення проблем обмеження Same-Origin Policy браузера, дозволяючи серверу вказувати, які джерела мають право зробити запити до ресурсів сервера.

Встановлення бібліотеки **nanoid**:

```js
npm install nanoid //нова версія не працює з CommonJS

$ npm i nanoid@3.3.4

const { nanoid } = require('nanoid');
```

1. імпортуємо файл-інтерфейс для роботи із списком контактів

## GoIT Node.js Course Template Homework

Виконайте форк цього репозиторію для виконання домашніх завдань (2-6)
Форк створить репозиторій на вашому http://github.com

Додайте ментора до колаборації

Для кожної домашньої роботи створюйте свою гілку.

- hw02
- hw03
- hw04
- hw05
- hw06

Кожна нова гілка для др повинна робитися з master

Після того, як ви закінчили виконувати домашнє завдання у своїй гілці, необхідно зробити пулл-реквест (PR). Потім додати ментора для рев'ю коду. Тільки після того, як ментор заапрувить PR, ви можете виконати мердж гілки з домашнім завданням у майстер.

Уважно читайте коментарі ментора. Виправте зауваження та зробіть коміт у гілці з домашнім завданням. Зміни підтягнуться у PR автоматично після того, як ви відправите коміт з виправленнями на github
Після виправлення знову додайте ментора на рев'ю коду.

- При здачі домашньої роботи є посилання на PR
- JS-код чистий та зрозумілий, для форматування використовується Prettier

### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок
- `http://localhost:3000/`
- `http://localhost:3000/api/contacts`

### Joi

Встановимо бібліотеку для перевірки тіла запиту:

```js
$ npm install joi
```

## GitHub

Щоб змержити зміни з однієї гілки в іншу на GitHub, вам слід виконати кілька кроків у вашому локальному репозиторії та після цього зробити push змін на віддалений репозиторій (GitHub). Ось загальний опис процесу:

Оновіть вашу гілку master:

bash
Copy code
git checkout master
git pull origin master
Перейдіть на гілку, з якої ви хочете взяти зміни:

bash
Copy code
git checkout назва_гілки
Зробіть зміни та закомітьте їх:

bash
Copy code
git add .
git commit -m "Опис ваших змін"
Перейдіть назад на гілку master:

bash
Copy code
git checkout master
Змірджіть зміни з іншої гілки в гілку master:

bash
Copy code
git merge назва_гілки
Якщо конфлікти, ви повинні їх вирішити. Git повідомить вас про конфлікти при спробі змірджити гілки.

Закомітьте зміни після злиття (merge commit):

bash
Copy code
git commit -m "Злиття змін з назва_гілки"
Оновіть віддалений репозиторій на GitHub:

bash
Copy code
git push origin master
Тепер ваші зміни з іншої гілки мають бути злиті з гілкою master на GitHub. Зверніть увагу, що вам може бути необхідно мати права на запис (write access) до репозиторію для виконання пушу змін.
