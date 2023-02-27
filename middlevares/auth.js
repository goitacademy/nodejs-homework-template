const jwt = require("jsonwebtoken");
const { UserModel } = require("../models");

const { SECRET_WORD } = process.env;

const auth = async (req, res, next) => {
  //read auth headers in req
  try {
    const { authorization } = req.headers;
    const [bearer, token] = authorization.split(" ");

    //check for auth token
    if (!token || bearer !== "Bearer") {
      res.status(404);
      throw new Error("Please, provide all required fields");
    }

    //verify token
    const { id } = jwt.verify(token, SECRET_WORD);

    //find user and send data next()
    const user = await UserModel.findById(id).select("email subscription");
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = auth;
