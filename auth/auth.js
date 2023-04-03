const jwt = require("jsonwebtoken");
// const { getUserById } = require("../controllers/users");
// const { get } = require("mongoose");

require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  const token = req.handlers.authorization;

  // const decode = jwt.decode(token);
  // console.log(decode);

  if (!token) {
    return res.status(401).send("No token provided");
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);

    console.log(decoded);
    // const { id } = decoded;

    // const user = await getUserById(id);

    // if (user.token === token) {
    //   req.body = user;
    next();
    // } else {
    //   return res.status(401).json({ message: "Not authorized" });
    // }
    // const { role } = user;

    // const isAllowed = allowedRoles.includes(role);

    //     if (user) {
    //       if (isAllowed) {
    //         next();
    //       } else {
    //         return res
    //           .status(403)
    //           .send("You don't have permission to this resource");
    //       }
    //     } else {
    //       return res.status(401).send("Access denied");
    //     }
  } catch (error) {
    return res.status(401).send({ message: "Acces denided", error });
  }
};

module.exports = auth;
