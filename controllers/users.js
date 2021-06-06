const Users = require("../repositories/users");
const { HttpCode } = require("../helpers/constants");
const jwt = require("jsonwebtoken"); // создание json web token

require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email); // поиск пользователя по email

    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: "error",
        code: HttpCode.CONFLICT,
        message: "Email in use",
      }); // если нашли user при регистрации,  и email уже есть в базе - возвращаем ошибку
    }
    const { id, email, subscription } = await Users.createUser(req.body); // создание нового пользователя
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: { id, email, subscription },
    });
  } catch (error) {
    next(error);
  }
};

// вводим email, password, в ответ - возвращается token. Их в этом приложении используем только для того, чтобы получить token, с которым уже и ходим api. Через email и password мы в данном случае не заходим
const login = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email); // поиск пользователя по email
    const isValidPassword = await user?.isValidPassword(req.body.password); // проверка валидности пароля

    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        message: "Email or password is wrong",
      }); // если user нет или пароль невалиден выдаем ошибку UNAUTHORIZED (401)
    }

    const id = user.id; // создание json web token
    const payload = { id }; //   создаем полезную нагрузку, в которой должна быть вся несекретная информация (это то, что мы зашифруем в token), шифруем только id
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" }); // создание token

    await Users.updateToken(id, token); // сперва устанавливаем пользователю token, и только потом его отдаем дальше конечному пользователю

    return res.json({ status: "success", code: HttpCode.OK, data: { token } });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const id = req.user.id; // достаем сперва id

    await Users.updateToken(id, null); // обнуляем token пользователя , присваеваем ему token=null

    return res.status(HttpCode.NO_CONTENT).json(); //  отдаем, что нет контента
  } catch (error) {
    next(error);
  }
};

const currentUser = async (req, res, next) => {
  try {
    console.log(req);

    const { email, subscription } = req.user;

    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { email, subscription },
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.user.id; // достаем сперва id, чтобы отображалась только те данные, которые принадлежат пользователю

    if (req.body) {
      const user = await Users.updateUserSubscription(id, req.body);

      const { email, subscription } = user;

      if (user) {
        return res.status(HttpCode.OK).json({
          status: "success",
          code: HttpCode.OK,
          data: { email, subscription },
        });
      }
      return res.json({ status: "error", code: 404, message: "Not Found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login, logout, currentUser, update };
