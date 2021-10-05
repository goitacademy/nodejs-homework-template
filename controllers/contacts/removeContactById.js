const { Contact } = require("../../models");
const { NotFound } = require("http-errors");
const { sendSuccessResponse } = require("../../utils");

const removeContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndDelete(contactId);
  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  sendSuccessResponse(res, { message: "Success delete", contact });
};

module.exports = removeContactById;
