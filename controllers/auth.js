const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../models/user');

const { HttpError, ctrlWrapper } = require('../helpers');

const { SECRET_KEY } = process.env;

const signup = async (req, res) => {};

const login = async (req, res) => {};

const getCurrent = async (req, res) => {};

const logout = async (req, res) => {};

module.exports = {
  signup,
  login,
  getCurrent,
  logout,
};
