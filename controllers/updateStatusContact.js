const createError = require("../helpers");
const { Contact } = require("../models");

const updateStatusContact = async (req, res) => {
  const { params, body } = req;
  const { contactId } = params;
  if (!body) {
    res.status(400).json({ message: "missing field favorite" });
  }
  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};
module.exports = updateStatusContact;
