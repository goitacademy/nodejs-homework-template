const jwt = require('jsonwebtoken');
const { httpError } = require('@root/helpers');
const { UserModel } = require('@root/models');

async function signup(req, res, next) {
  const { email, password } = req.body;
  console.log((await UserModel.find({ email })).length);

  const hasUserWithEmail = !!(await UserModel.find({ email })).length;
  console.log(hasUserWithEmail);

  res.status(200).json();
}

module.exports = {
  signup,
};
