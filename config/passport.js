// подключение passport. Чтобы база данных всех contacts была недоступна, если пользователь незалогинен
// passport - это обертка над каждой стратегией
// passport-jwt - отдельная реализация под каждый сервис
// ExtractJwt - это как мы каждый token можем доставать. Есть разные способы (из header, body, Bearer, из схемы, можно самим написать, через query-параметры)

// достается JwtStrategy, ExtractJwt и
const passport = require("passport");

const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

const Users = require("../repositories/users"); // data

// opts - это опции. Как найти token и как он был зашифрован
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_KEY;

// Strategy работает таким образом, идет в базу данных и ищет пользователя по id
passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      const user = await Users.findById(payload.id); // поиск user. jwt strategy находит token в заголовке (Bearer), рассшифровывает его, и создает объект, как на сайте https://jwt.io/. В token есть payload с id, по которому уже и можно найти user

      if (!user) {
        return done(new Error("User not found")); //  если нет user вызываем callback, и чтоб дальше не выполнялось сформировываем ошибку
      }
      if (!user.token) {
        return done(null, false); // если нет token, вместо user - отправляем false. null - обозначает, что нет никакой ошибки. Первый параметр под node.js передается ошибка
      }

      return done(null, user); // если есть user и token, все хорошо и без ошибок, только в этом случае возвращаем в callback  user
    } catch (error) {
      done(error, false);
    }
  })
);
