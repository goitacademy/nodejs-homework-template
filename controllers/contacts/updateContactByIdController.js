const { NotFound } = require("http-errors");
const { Contact } = require("../../models");

const updateContactByIdController = async (req, res) => {
  const { id } = req.params;
  const updatedContact = await Contact.findOneAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedContact) {
    throw new NotFound(`Contact with id=${id} not found`);
  }

  res.status(200).json(updatedContact);
};

module.exports = updateContactByIdController;
