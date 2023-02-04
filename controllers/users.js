const jwt = require('jsonwebtoken');
const { httpError } = require('@root/helpers');
const { UserModel } = require('@root/models');

async function signup(req, res, next) {
  // const contacts = await UserModel.find({});

  res.status(200).json();
}

module.exports = {
  signup,
};
