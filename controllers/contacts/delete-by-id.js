const { ContactModel } = require("../../models/contact.model");

const deleteById = async (req, res, next) => {
  const { id } = req.params;

  await ContactModel.findByIdAndDelete(id);
  res.status(204).send();
};

module.exports = {
  deleteById,
};
