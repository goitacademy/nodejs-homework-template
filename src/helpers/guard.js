const passport = require("passport");
require("../config/passport");
const { HttpCode } = require("./constants");

const guard = (req, res, next) => {
  //колл бек (err, user) - это done из конфигурации паспорта
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      return next({ status: HttpCode.FORBIDDEN, message: "Forbidden" });
    }
    req.user = user;
    //res.locals.user = user - так хочет экспресс но так никто не делает, переменная на текущем запросе для текущего пользователя
    //req.app.locals.var - глобальная переменная, например общее количество пользователей

    return next();
  })(req, res, next);
};

module.exports = guard;
