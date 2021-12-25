const createError = require("http-errors");
const { Contact } = require("../../model");

const getContact = async (req, res) => {
  const { id } = req.params;
  const contactById = await Contact.findById(id);
  if (!contactById) {
    throw new createError(404, `Contact with id=${id} not found`);
  }
  res.status(200).json(contactById);
};
module.exports = getContact;
