const { ContactModel } = require("../models");
const { createHttpException } = require("../helpers");

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await ContactModel.findById(id);
  if (!result) {
    throw createHttpException(404, "There isn`t book with selected id");
  }
  res.json(result);
};

module.exports = {
  getById,
};
