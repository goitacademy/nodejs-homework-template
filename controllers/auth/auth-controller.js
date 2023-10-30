const { User } = require("../../models");

const { HttpError } = require("../../helpers");

const { controllerWrapper } = require("../../decorators");

const signup = async (req, res) => {};

module.exports = { signup: controllerWrapper(signup) };
