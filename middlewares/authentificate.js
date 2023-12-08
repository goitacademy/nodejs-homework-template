const jwt = require("jsonwebtoken");
const { User } = require("../service/schemas/userSchema");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (typeof authHeader === "undefined") {
    return res.status(401).send({ message: "Error: token sent incorrectly" });
  }

  const [bearer, token] = authHeader.split(" ", 2);

  if (bearer !== "Bearer") {
    return res.status(401).send({ message: "Token has not a Bearer type" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      return res.status(401).send({ message: "ошибка верификации токена" });
    }

    try {
      req.user = decode;

      const user = await User.findById(decode.userId).exec();

      if (user === null) {
        return res.status(401).send({ message: "User not found" });
      }

      if (!user._id) {
        return res.status(401).send({ message: "User ID not found" });
      }

      if (!user.token || user.token !== token) {
        return res
          .status(401)
          .send({ message: "Несоответствие токенов при сравнении" });
      }

      req.user = user;

      next();
    } catch (error) {
      next(error);
    }
  });
};

module.exports = authenticate;
