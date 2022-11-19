const {customError} = require("../helpers/error");
const {User} = require("../models/user");
const {
  // singUpServ,
  // singInServ,
  // singOutServ,
  // currentUserServ,
  // subscriptServ,
  singUp,
  singIn,
  singOut,
  currentUser,
  changeSub,
} = require("../services/auth");

const singUpCtrl = async (req, res) => {
  const {email, password, subscription} = req.body;
  // const data = await singUpServ(email, password, subscription);
  // res.status(201).json({user: data});
  await singUp(email, password, subscription);

  res.json({
    status: "success",
    code: 201,
    data: {
      email: email,
      subscription: subscription,
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
      email: currentUser.email,
      subscription: currentUser.currentUser,
    },
  });
};

const singOutCtrl = async (req, res, next) => {
  const Id = req.user._id;
  // const response=await singOutServ(Id);
  // return res.status(204).json(response);
  await singOut(Id);

  res.json({
    status: "success",
    code: 204,
    data: {
      message: "No Content",
    },
  });
};

const currentUserCtrl = async (req, res, next) => {
  const Id = req.user._id;
  // const response = await currentUser(Id);
  // return res.status(204).json(response);
  console.log("Id:", Id);
  await currentUser(Id);

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
