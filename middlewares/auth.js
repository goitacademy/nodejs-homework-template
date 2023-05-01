/*
Извлекает токен из заголовка и:
1. Проверяет валидность токена (то, что мы его выдали и он не истек)
2. Извлекает из токена id, находит пользователя в базе по id и прикрепляет его к запросу (req.user).
*/

/*
1. Извлечь из заголовком запроса содержимое заголовка Authorization.
2. Разделить его на 2 слова: bearer и токен.
3. Проверить равно ли первое слово "Bearer".
4. Проверить валидность второго слова (токен).
5. Если токен валиден - извлечь из него id и найти пользователя в базе с таким id.
6. Если пользователя с таким id мы нашли в базе - его нужно 
прикрепить к запросу (объект req)
*/

const {Unautorized} = require("http-errors");
const jwt = require("jsonwebtoken");
const {User} = require("../models");

const auth = async (req, res, next) => {
   const {authorization = ""} = req.headers;
   const [bearer, token] = authorization.split(" ");  
   const {SECRET_KEY} = process.env; 
   
    if(bearer !== "Bearer" || !token) {
      throw new Unautorized("Not authorized");
     }
     try {
    const {id} = jwt.verify(token, SECRET_KEY);  
    const user = await User.findById(id);
    if(!user || !user.token || user.token !== token){
      throw new Unautorized("Not authorized");
    } 
    req.user = user;
    next();
   } catch (error) {
    if(error.message === "Invalid sugnature") {
      // error.status = 401;    
      res.status(401).json( {"message": "Not authorized"})
    }
    
   next(error);
   }
}

module.exports = auth;