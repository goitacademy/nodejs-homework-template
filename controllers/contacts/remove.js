const createError = require("http-errors");

const contactOperations = require("../../models/contacts");

const remove = async (req, res) => {
  const { id } = req.params;
  const result = await contactOperations.removeContact(id);

  if (!result) {
    throw createError(404, "not found");
  }

  res.status(200).json({ message: "contact deleted" });
};

module.exports = remove;
