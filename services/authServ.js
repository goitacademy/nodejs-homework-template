const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User} = require("../models/user");
const {SECRET} = require("../config");

const singUp = async (email, password, subscription) => {
  const user = new User(
    {email, password: await bcrypt.hash(password, 10)},
    subscription
  );
  if (!user) {
    return null;
  }

  await user.save();
  return user;
};

const singIn = async (email, password) => {
  const currentUser = await User.findOne({email});
  if (!currentUser) {
    return null;
  }

  const isValidePassword = await bcrypt.compare(password, currentUser.password);

  if (!isValidePassword) {
    return null;
  }

  const payload = {id: currentUser.id};

  const token = jwt.sign(payload, SECRET, {expiresIn: "1w"});
  await User.findByIdAndUpdate({_id: currentUser.id}, {token}, {new: true});

  const user = {
    token,
    user: {
      email: currentUser.email,
      subscription: currentUser.subscription,
    },
  };

  return user;
};

const changeSub = async (subscription, _id) => {
  const results = await User.findByIdAndUpdate(
    {_id},
    {subscription},
    {
      returnOriginal: false,
    }
  );

  return results.subscription;
};

module.exports = {
  singUp,
  singIn,
  changeSub,
};
