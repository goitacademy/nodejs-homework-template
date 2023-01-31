const { NotFound } = require("http-errors");
const { updateContactById } = require("../../models/contacts");

const updateContactByIdController = async (req, res) => {
  const { id } = req.params;
  const updatedContact = await updateContactById(id, req.body);

  if (!updatedContact) {
    throw new NotFound(`Contact with id=${id} not found`);
  }

  res.status(200).json(updatedContact);
};

module.exports = updateContactByIdController;
