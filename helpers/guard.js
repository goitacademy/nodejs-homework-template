// guard.js - в этом файле создадим middleware, которая будет вешаться на Route и будет указывать можно ли продолжать выполнение кода или нет. Также подключаем логику passport, которая прописана в файле config/passport

const passport = require("passport");

require("../config/passport");

const { HttpCode } = require("./constants");

const guard = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user) => {
    const headerAuth = req.get("Authorization"); // формируем ответ так, как нам удобно. Нужно получить token
    // console.log(headerAuth);

    let token = null; // создаем переменную token, которая по умолчанию

    if (headerAuth) {
      token = headerAuth.split(" ")[1]; // если headerAuth = undefined, token будет = null
    }

    if (error || !user || token !== user?.token) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        message: "Email or password is wrong",
      }); // если ошибка, или нет user, или token, который записан в базе  не совпадает с тем, который пришел - выдаем ошибку UNAUTHORIZED (401), чтобы не возвращалась просто строка Unauthorized
    }

    req.user = user; //   хешируем user, чтобы не лазить больше в базу данных за ним. Т.е. приходит user со своим token, мы в файле config/passport раз его нашли и теперь он будет доступен до конца request в любом месте controller. Express просит прописывать так: res.locals.user = user, но на практике так почему-то не делают, хоть это и неправильно

    return next();
  })(req, res, next); // jwt - по умолчанию имя стратегии, которое при необходимости можно поменять через опции; не используется session, т.е. не применяем cookie. 3-й параметр - это callback done из файла  config/passport, которая принимает или ошибку (error) или user. При каждом новом запросе нужно снова передавать passport-jwt для passport; у passport.authenticate есть callback, фактически он возвращает функцию, которая принимает req, res, next.
};

module.exports = guard;
