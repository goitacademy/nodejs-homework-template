// const {customError} = require("../helpers/error");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {Conflict, Unauthorized} = require("http-errors");
const {SECRET} = require("../config");
const {User} = require("../models/user");

const singUpServ = async (email, password, subscription) => {
  const user = await User.findOne({email});
  if (!user) {
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPass,
      subscription,
    });
    return newUser;
  }
  throw new Conflict("Email in use");
};

const singInServ = async (email, password) => {
  const user = await User.findOne({email});
  const isPassCompare = await bcrypt.compare(password, user.password);
  if (!user || !isPassCompare) {
    throw new Unauthorized("Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET);
  await User.findByIdAndUpdate(user._id, {token});

  return {
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };
};

// const logout = async (req, res, next) => {
//   const response = await singOut(req);
//   return res.status(204).json();
// };

const singOutServ = async (req, res, next) => {
  // console.log("req:", req);
  const response = await singOut(req);
  return res.status(204).json(response);
  // res.json({
  //   status: "success",
  //   code: 204,
  //   data: {
  //     message: "No Content",
  //   },
  // });
};

const currentUserServ = async (req, res, next) => {
  const response = await currentUser(req);
  return res.status(204).json(response);
  // const {subscription} = req.user;
  // const {email} = req.body;
  // const id = String(req.user._id);
  // const user = User.findById(id);
  // res.json({
  //   status: "success",
  //   code: 200,
  //   data: {
  //     user: {email: user.email, subscription: user.subscription},
  //   },
  // });
};

const subscriptServ = async (req, res, next) => {
  const {subscription} = req.body;
  const {_id} = req.user;

  const newSubscription = await changeSub(subscription, _id);

  if (!newSubscription) throw customError({status: 400, message: "error"});

  res.status(200).json({subscription: newSubscription});
};

module.exports = {
  singUpServ,
  singInServ,
  singOutServ,
  currentUserServ,
  subscriptServ,
};

// const singOutController = async (req, res) => {
//   res.json({
//     status: "success",
//     code: 204,
//     data: {
//       message: "No Content",
//     },
//   });
// };

// return await User.create({email, password: await bcrypt.hash(password, 10), subscription});
