const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { addUser, getUserByEmail, updateUser } = require("../models");

const userRegistration = async (req, res, next) => {
  const password = req.body.password;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  req.body.password = hashedPassword;
  try {
    const user = await addUser(req.body);
    res.status(201).json({
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    error.status = 409;
    error.message = "Email in use";
    throw error;
  }
};

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const userFromDB = await getUserByEmail(email);
  if (!userFromDB) {
    const error = new Error("Email or password is wrong");
    error.status = 401;
    throw error;
  }
  const isComparedPasswordTheSame = await bcrypt.compare(
    password,
    userFromDB.password
  );
  if (!isComparedPasswordTheSame) {
    const error = new Error("Email or password is wrong");
    error.status = 401;
    throw error;
  }
  const token = jwt.sign({ _id: userFromDB._id }, process.env.JWT_SECRET);
  await updateUser(userFromDB._id, { token });

  res.status(200).json({
    token,
    user: { email: userFromDB.email, subscription: userFromDB.subscription },
  });
};

const userLogout = async (req, res, next) => {
  // проверка токена в предыдущем мидлваре
  let { _id, token } = req.user;
  token = null;
  const user = await updateUser(_id, { token });
  console.log(user);
  res.status(204).json();
};

const userCurrent = async (req, res, next) => {
  // проверка токена в предыдущем мидлваре
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
};
module.exports = { userRegistration, userLogin, userLogout, userCurrent };
