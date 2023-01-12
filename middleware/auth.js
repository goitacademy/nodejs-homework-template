const jwt = require("jsonwebtoken");
require("dotenv").config();
const { findById } = require("../models/functionsUsers");

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer = "", token = ""] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw new Error(401);
    }
    const payload = jwt.verify(token, SECRET_KEY);
    const { id } = payload;

    const resultUser = await findById(id);

    if (!resultUser || token !== resultUser.token) {
      return res.status(401).send({ message: "Not authorized" });
    }
    req.user = resultUser;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
