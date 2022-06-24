# Домашнее задание 6

Создай ветку `hw06-email` из ветки `master`.

Продолжаем создание REST API для работы с коллекцией контактов. Добавьте верификацию email пользователя после регистрации при помощи сервиса [SendGrid](https://sendgrid.com/).

## Как процесс верификации должен работать

1. После регистрации, пользователь должен получить письмо на указанную при регистрации почту с ссылкой для верификации своего email
2. Пройдя ссылке в полученном письме, в первый раз, пользователь должен получить [Ответ со статусом 200](#verification-success-response), что будет подразумевать успешную верификацию email
3. Пройдя по ссылке повторно пользователь должен получить [Ошибку со статусом 404](#verification-user-not-found)

## Шаг 1

### Подготовка интеграции с SendGrid API

- Зарегистрируйся на [SendGrid](https://sendgrid.com/).
- Создай email-отправителя. Для это в административной панели SendGrid зайдите в меню Marketing в подменю senders и в правом верхнем углу нажмите кнопку "Create New Sender". Заполните необходимые поля в предложенной форме. Сохраните. Должен получится следующий как на картинке результат, только с вашим email:

![sender](sender-not-verify.png)

На указанный email должно прийти письмо верификации (проверьте спам если не видите письма). Кликните на ссылку в нем и завершите процесс. Результат должен изменится на:

![sender](sender-verify.png)

- Теперь необходимо создать API токен доступа. Выбираем меню "Email API", и подменю "Integration Guide". Здесь выбираем "Web API"

![api-key](web-api.png)

Дальше необходимо выбрать технологию Node.js

![api-key](node.png)

На третьем шаге даем имя нашему токену. Например systemcats, нажимаем кнопку сгенерировать и получаем результат как на скриншоте ниже. Необходимо скопировать этот токен (это важно, так как больше вы не сможете его посмотреть). После завершить процесс создания токена

![api-key](api-key.png)

- Полученный API-токен надо добавить в `.env` файл в нашем проекте

## Шаг 2

### Создание ендпоинта для верификации email'а

- добавить в модель `User` два поля `verificationToken` и `verify`. Значение поля `verify` равное `false` будет означать, что его email еще не прошел верификацию

```js
{
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
}
```

- создать эндпоинт GET [`/users/verify/:verificationToken`](#verification-request), где по параметру `verificationToken` мы будем искать пользователя в модели `User`
- если пользователь с таким токеном не найден, необходимо вернуть [Ошибку 'Not Found'](#verification-user-not-found)
- если пользователь найден - устанавливаем `verificationToken` в `null`, а поле `verify` ставим равным `true` в документе пользователя и возвращаем [Успешный ответ](#verification-success-response)

### Verification request

```shell
GET /auth/verify/:verificationToken
```

### Verification user Not Found

```shell
Status: 404 Not Found
ResponseBody: {
  message: 'User not found'
}
```

### Verification success response

```shell
Status: 200 OK
ResponseBody: {
  message: 'Verification successful',
}
```

## Шаг 3

### Добавление отправки email пользователю с ссылкой для верификации

При создания пользователя при регистрации:

- создать `verificationToken` для пользователя и записать его в БД (для генерации токена используйте пакет [uuid](https://www.npmjs.com/package/uuid) или [nanoid](https://www.npmjs.com/package/nanoid))
- отправить email на почту пользователя и указать ссылку для верификации email'а (`/users/verify/:verificationToken`) в сообщении
- Так же необходимо учитывать, что теперь логин пользователя не разрешен при не верифицированном email

## Шаг 4

### Добавление повторной отправки email пользователю с ссылкой для верификации

Необходимо предусмотреть, вариант, что пользователь может случайно удалить письмо. Оно может не дойти по какой-то причине к адресату. Наш сервис отправки писем во время регистрации выдал ошибку и т.д.

#### @ POST /users/verify/

- Получает `body` в формате `{ email }`
- Если в `body` нет обязательного поля `email`, возвращает json с ключом `{"message": "missing required field email"}` и статусом `400`
- Если с `body` все хорошо, выполняем повторную отправку письма с `verificationToken` на указанный email, но только если пользователь не верифицирован
- Если пользователь уже прошел верификацию отправить json с ключом `{ message: "Verification has already been passed"}` со статусом `400 Bad Request`

#### Resending a email request

```shell
POST /users/verify
Content-Type: application/json
RequestBody: {
  "email": "example@example.com"
}
```

#### Resending a email validation error

```shell
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Ошибка от Joi или другой библиотеки валидации>
```

#### Resending a email success response

```shell
Status: 200 Ok
Content-Type: application/json
ResponseBody: {
  "message": "Verification email sent"
}
```

#### Resend email for verified user

```shell
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: {
  message: "Verification has already been passed"
}
```

> Примечание: Как альтернативу SendGrid можно использовать пакет [nodemailer](https://www.npmjs.com/package/nodemailer)

## Дополнительное задание - необязательное

### 1. Напишите dockerfile для вашего приложения
