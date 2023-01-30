const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { User } = require("../models/userModels");
require("dotenv").config();

const secret = process.env.SECRET;

// const auth = (req, res, next) => {
//   passport.authenticate("jwt", { session: false }, (err, user) => {
//     if (!user || err) {
//       return res.status(401).json({
//         status: "error",
//         code: 401,
//         message: "Unauthorized",
//         data: "Unauthorized",
//       });
//     }
//     req.user = user;
//     next();
//   })(req, res, next);
// };

const signup = async (name, email, password) => {
  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email is already in use",
      data: "Conflict",
    });
  }

  const hashPassword = bcrypt.hashSync(password);

  const newUser = await User.create({ name, email, password: hashPassword });
  return newUser;

  // newUser.setPassword(password);
  // await newUser.save();
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Incorrect login or password",
      data: "Bad request",
    });
  }

  const payload = {
    id: user.id,
    // username: user.username,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
};

// router.get("/list", auth, (req, res, next) => {
//   const { username } = req.user;
//   res.json({
//     status: "success",
//     code: 200,
//     data: {
//       message: `Authorization was successful: ${username}`,
//     },
//   });
// });

module.exports = { signup, login };
