const models = require("../models");

exports.getOneUser = (id) => models.UsersModel.findById(id);
