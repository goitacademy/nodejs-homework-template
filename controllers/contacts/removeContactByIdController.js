const { setSuccessResponse } = require("../../helpers");
const { NotFound } = require("http-errors");
const { removeContactById } = require("../../models/contacts");

const removeContactByIdController = async (req, res) => {
  const { id } = req.params;
  const removeContact = await removeContactById(id);
  if (!removeContact) {
    throw new NotFound(`Contact with id=${id} not found`);
  }
  res.json(setSuccessResponse(200, "Contact deleted"));
};

module.exports = removeContactByIdController;
