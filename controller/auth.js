const {customError} = require("../helpers/error");
const {User} = require("../models/user");
const {singUp, singIn, singOut, changeSub} = require("../services/authServ");

const singUpCtrl = async (req, res) => {
  const {email, password, subscription} = req.body;
  const user = await User.findOne({email});
  if (user) throw customError({status: 409, message: "Email in use"});

  await singUp(email, password, subscription);

  res.json({
    status: "success",
    code: 201,
    data: {
      email,
      subscription,
      message: "Registration successful",
    },
  });
};

const singInCtrl = async (req, res) => {
  const {email, password} = req.body;

  const currentUser = await singIn(email, password);
  if (!currentUser)
    throw customError({status: 401, message: "Email or password is wrong"});

  res.json({
    status: "success",
    code: 200,
    token: currentUser.token,
    data: {
      email,
      subscription: "starter",
    },
  });
};

// const logout = async (req, res, next) => {
//   const response = await singOut(req);
//   return res.status(204).json();
// };

const singOutCtrl = async (req, res, next) => {
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

const currentUserCtrl = (req, res, next) => {
  // const {subscription} = req.user;
  // const {email} = req.body;
  const id = String(req.user._id);
  const user = User.findById(id);
  res.json({
    status: "success",
    code: 200,
    data: {
      user: {email: user.email, subscription: user.subscription},
    },
  });
};

const subscriptCtrl = async (req, res, next) => {
  const {subscription} = req.body;
  const {_id} = req.user;

  const newSubscription = await changeSub(subscription, _id);

  if (!newSubscription) throw customError({status: 400, message: "error"});

  res.status(200).json({subscription: newSubscription});
};

module.exports = {
  singUpCtrl,
  singInCtrl,
  singOutCtrl,
  currentUserCtrl,
  subscriptCtrl,
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
