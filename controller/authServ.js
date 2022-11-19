// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const {User} = require("../models/user");
// const {SECRET} = require("../config");
// const {Unauthorized} = require("http-errors");
// const {
//   // singUpServ,
//   // singInServ,
//   // singOutServ,
//   // currentUserServ,
//   // subscriptServ,
//   // singUp,
//   // singIn,
//   // singOut,
//   // currentUser,
//   // changeSub,
// } = require("../services/auth");
// const singUpCtrl = async (email, password, subscription) => {
//   const user = new User(
//     {email, password: await bcrypt.hash(password, 10)},
//     subscription
//   );
//   if (!user) {
//     return null;
//   }

//   await user.save();
//   return user;
// };

// const singInCtrl = async (email, password) => {
//   const currentUser = await User.findOne({email});
//   if (!currentUser) {
//     return null;
//   }

//   const isValidePassword = await bcrypt.compare(password, currentUser.password);

//   if (!isValidePassword) {
//     return null;
//   }

//   const payload = {id: currentUser.id};

//   const token = jwt.sign(payload, SECRET, {expiresIn: "1w"});
//   await User.findByIdAndUpdate({_id: currentUser.id}, {token}, {new: true});

//   const user = {
//     token,
//     user: {
//       email: currentUser.email,
//       subscription: currentUser.subscription,
//     },
//   };

//   return user;
// };

// const singOutCtrl = async ({userId}) => {
//   const user = await User.findOne({_id: userId});

//   user.token = null;
//   await user.save();
// };

// const currentUserCtrl = async ({userId}) => {
//   const user = await User.findOne({_id: userId});
//   // chack user!
//   if (!user) throw new Unauthorized("Not authorized");
//   const {email, subscription} = user;
//   return {email, subscription};
//   // send JWT
// };

// const changeSubCtrl = async (subscription, _id) => {
//   const results = await User.findByIdAndUpdate(
//     {_id},
//     {subscription},
//     {
//       returnOriginal: false,
//     }
//   );

//   return results.subscription;
// };

// module.exports = {
//   singUpCtrl,
//   singInCtrl,
//   singOutCtrl,
//   currentUserCtrl,
//   changeSubCtrl,
// };
