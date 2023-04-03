const jwt = require("jsonwebtoken");
// const { listContacts } = require("../controllers/contacts");
// const { getUserById } = require("../controllers/users");
// const { get } = require("mongoose");

require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  // const decode = jwt.decode(token);
  // console.log(decode);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    // console.log(decoded);
    // const { id } = decoded;

    // const user = await listContacts();

    // if (user.token === token) {
    //   req.body = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Acces denided",
      error,
    });
  }
};

module.exports = auth;
