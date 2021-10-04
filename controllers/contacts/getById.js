const { NotFound } = require("http-errors");
const { sendSuccessRes } = require("../../helpers/index");
const contactsOperations = require("../../model/contacts");

const getById = async (req, res, next) => {
  const result = await contactsOperations.getContactById(req.params.contactId);

  if (!result) {
    throw new NotFound("Not found.");
  }

  sendSuccessRes(res, { result });
};

module.exports = getById;
