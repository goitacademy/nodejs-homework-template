Домашнее задание 4
Создайте ветку hw04-auth из ветки master.

Продолжите создание REST API для работы с коллекцией контактов. Добавьте логику аутентификации/авторизации пользователя с помощью JWT.

Шаг 1
В коде создайте схему и модель пользователя для коллекции users.

{
  password: {
    type: String,
    required: [true, 'Password is required'],
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
  token: {
    type: String,
    default: null,
  },
}
Чтобы каждый пользователь работал и видел только свои контакты в схеме контактов добавьте свойство owner

    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    }
Примечание: 'user' - название коллекции (в единственном числе), в которой хранятся пользователи.

Шаг 2
Регистрация
Создайте эндпоинт /users/signup

Сделать валидацию всех обязательных полей (email и password). При ошибке валидации вернуть Ошибку валидации.

В случае успешной валидации в модели User создать пользователя по данным которые прошли валидацию. Для засолки паролей используй bcrypt или bcryptjs

Если почта уже используется кем-то другим, вернуть Ошибку Conflict.
В противном случае вернуть Успешный ответ.
Registration request
POST /users/signup
Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
}
Registration validation error
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Ошибка от Joi или другой библиотеки валидации>
Registration conflict error
Status: 409 Conflict
Content-Type: application/json
ResponseBody: {
  "message": "Email in use"
}
Registration success response
Status: 201 Created
Content-Type: application/json
ResponseBody: {
  "user": {
    "email": "example@example.com",
    "subscription": "starter"
  }
}
Логин
Создайте эндпоинт /users/login

В модели User найти пользователя по email.

Сделать валидацию всех обязательных полей (email и password). При ошибке валидации вернуть Ошибку валидации.

В противном случае, сравнить пароль для найденного юзера, если пароли совпадают создать токен, сохранить в текущем юзере и вернуть Успешный ответ.
Если пароль или email неверный, вернуть Ошибку Unauthorized.
Login request
POST /users/login
Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
}
Login validation error
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Ошибка от Joi или другой библиотеки  валидации>
Login success response
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "token": "exampletoken",
  "user": {
    "email": "example@example.com",
    "subscription": "starter"
  }
}
Login auth error
Status: 401 Unauthorized
ResponseBody: {
  "message": "Email or password is wrong"
}
Шаг 3
Проверка токена
Создайте мидлвар для проверки токена и добавь его ко всем маршрутам, которые должны быть защищены.

Мидлвар берет токен из заголовков Authorization, проверяет токен на валидность.
В случае ошибки вернуть Ошибку Unauthorized.
Если валидация прошла успешно, получить из токена id пользователя. Найти пользователя в базе данных по этому id.
Если пользователь существует и токен совпадает с тем, что находится в базе, записать его данные в req.user и вызвать методnext().
Если пользователя с таким id не существует или токены не совпадают, вернуть Ошибку Unauthorized
Middleware unauthorized error
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
Шаг 4
Логаут
Создайте ендпоинт /users/logout

Добавьте в маршрут мидлвар проверки токена.

В модели User найти пользователя по _id.
Если пользователя не существует вернуть Ошибку Unauthorized.
В противном случае, удалить токен в текущем юзере и вернуть Успешный ответ.
Logout request
GET /users/logout
Authorization: "Bearer {{token}}"
Logout unauthorized error
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
Logout success response
Status: 204 No Content
Шаг 5
Текущий пользователь - получить данные юзера по токену
Создайте эндпоинт /users/current

Добавьте в маршрут мидлвар проверки токена.

Если пользователя не существует вернуть Ошибку Unauthorized
В противном случае вернуть Успешный ответ
Current user request
GET /users/current
Authorization: "Bearer {{token}}"
Current user unauthorized error
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
Current user success response
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "email": "example@example.com",
  "subscription": "starter"
}
Дополнительное задание - необязательное
Сделать пагинацию для коллекции контактов (GET /contacts?page=1&limit=20).
Сделать фильтрацию контактов по полю избранного (GET /contacts?favorite=true)
Обновление подписки (subscription) пользователя через эндпоинт PATCH /users. Подписка должна иметь одно из следующих значений ['starter', 'pro', 'business']