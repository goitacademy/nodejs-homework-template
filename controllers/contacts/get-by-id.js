const { ContactModel } = require("../../models/contact.model");
const { createHttpException } = require("../../helpers/create-http-exception");

const getById = async (req, res, next) => {
  const { id } = req.params;

  const result = await ContactModel.findById(id);
  if (!result) {
    throw createHttpException(404, "The contact is not found");
  }

  res.json(result);
};

module.exports = {
  getById,
};
