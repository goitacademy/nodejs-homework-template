const { NotFound } = require("http-errors");
const { Contact } = require("../../models");

const removeContactByIdController = async (req, res) => {
  const { id } = req.params;
  const removeContact = await Contact.findOneAndRemove(id);

  if (!removeContact) {
    throw new NotFound(`Contact with id=${id} not found`);
  }

  res.status(200).json({ message: "Contact deleted" });
};

module.exports = removeContactByIdController;
