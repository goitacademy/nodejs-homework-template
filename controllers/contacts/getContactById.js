const { Contact } = require("../../models");
const { NotFound } = require("http-errors");
const { sendSuccessResponse } = require("../../utils");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  // console.log(req.params); //все динамич.части хранятся
  const contact = await Contact.findById(req.params.contactId);
  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  sendSuccessResponse(res, { contact });
};

module.exports = getContactById;
