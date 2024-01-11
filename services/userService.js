const models = require("../models");

exports.getOneUser = (id) => models.UsersModel.findById(id);
exports.getCurrentUser = (email) => models.UsersModel.findOne({ email: email });
