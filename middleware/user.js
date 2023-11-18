const jwt = require("jsonwebtoken")

    function auth(req, res, next) {
      const authHeader = req.headers.authorization;
    
      if (!authHeader) {
        return res.status(401).send({ message: "Не предоставлен заголовок авторизации" });
      }
    
      try {
        const [bearer, token] = authHeader.split(" ", 2);
    
        if (bearer !== "Bearer") {
          return res.status(401).send({ message: "Not authorized" });
        }
    
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
          if (err) {
            return res.status(401).send({ message: "Not authorized" });
          }
    
          console.log(decode);
    
          next();
        });
      } catch (error) {
        console.error("Error during authentication:", error);
        return res.status(500).send({ message: "Ошибка аутентификации" });
      }
    }

    module.exports = auth;