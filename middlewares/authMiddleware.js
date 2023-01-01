//-----------------------------------------------------------------------------
/*
Извлекает токен из заголовка и:
1. Проверяет валидность токена (то есть что мы его выдали и он не истек).
2. Извлекает из токена id, находит пользователя в базе по id и прикрепляет его 
к запросу (req.user).
*/

/*
1. Извлечь из заголовков запроса содержимое заголовка Authorization.
2. Разделить его на 2 слова: bearer и токен.
3. Проверить равно ли первое слово "Bearer".
4. Проверить валидность второго слова (токен).
5. Если токен валиден - извлечь из него id и найти пользователя в базе 
с таким id.
6. Если пользователя с таким id мы нашли в базе - его нужно 
прикрепить к запросу (объект req).
*/
//-----------------------------------------------------------------------------
const { Unauthorized } = require("http-errors");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const { User } = require("../models");


//-----------------------------------------------------------------------------
const authMiddleware = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    try {
        //! Проверка Bearer
        if (bearer !== "Bearer") {
            throw new Unauthorized("Not authorized. Invalid Bearer")
        }
        //! Проверка наличия токена
        if (!token) {
            throw new Unauthorized("Not authorized. No token");
        }
        //! Объект user c payload = { id: user._id, email: user.email, } ==> loginController (1-вариант)
        let user = jwt.decode(token, JWT_SECRET);

        //! Проверка валидности токена
        if (!user) {
            console.log("authMiddleware-->user(jwt):".bgYellow.magenta, user); //!
            throw new Unauthorized("Not authorized. Invalid token");
        }
        //! Весь объект user (2-вариант)
        const { id } = jwt.verify(token, JWT_SECRET);
        user = await User.findById(id);
        // console.log("authMiddleware-->user(User.findById):".bgYellow.blue, user); //!

        //! Проверка user и валидности его токена
        if (!user || !user.token) {
            throw new Unauthorized("Not authorized. Invalid user token");
        }
        req.user = user;
        // req.token = token; //! только для (1-вариант)
        next();
    } catch (error) {
        console.log(error.message);
        if (error.message === "Invalid sugnature") {
            error.status = 401;
        }
        next(error);
    }
}

module.exports = authMiddleware




//todo --> OLD из лекций Кирилла Ежова
// const authMiddleware = (req, res, next) => {
//     try {
//         const [tokenType, token] = req.headers["authorization"].split(" "); //* Bearer
//         console.log(""); //!
//         console.log("tokenType:".bgGreen.black, tokenType); //!
//         console.log("token:".bgGreen.black, token); //!
//         console.log(""); //!
//         //! Проверка наличия токена
//         if (!token) {
//             throw new Unauthorized("Not authorized. No token");
//         }
//         const user = jwt.decode(token, JWT_SECRET);
//         //! Проверка валидности токена
//         if (!user) {
//             console.log("authMiddleware-->user:".bgGreen.magenta, user); //!
//             throw new Unauthorized("Not authorized. Invalid token");
//         }
//         req.token = token;
//         req.user = user;
//         next();
//     } catch (error) {
//         console.log(error.message);
//         next(error);
//     }
// }