const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");

const authorization = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    
    const { id } = jwt.verify(token, process.env.SECRET);

    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      return res.status(401).send({ message: "Not authorized" });
    }
    
    req.user = user;
    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
      error.message = "Not authorized";
    }
    next(error);
  }
};

module.exports = authorization;