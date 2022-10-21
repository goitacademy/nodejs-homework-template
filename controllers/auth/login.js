const { Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized(`User with email: ${email} not found!`);
  }
  const comparePassword = bcrypt.compareSync(password, user.password);

  if (!comparePassword) {
    throw new Unauthorized(`Password wrong!`);
  }
  // res.status(201).json({
  //   status: "success",
  //   code: 201,
  //   data: {
  //     user: {
  //       email,
  //     },
  //   },
  // });

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  res.json({
    status: "success",
    code: 200,
    data: { token },
  });
  // console.log(token);
  // const decodeToken = jwt.decode(token);
  // console.log(decodeToken);
  // try {
  //   const result = jwt.verify(token, SECRET_KEY);
  //   console.log("result", result);
  //   const result2 = jwt.verify(`${token}22`, SECRET_KEY);
  //   console.log("result2", result2);
  // } catch (error) {
  //   console.log(error.message);
  // }
};

module.exports = login;
