const { NotFound } = require("http-errors");
const { sendSuccessRes } = require("../../helpers");
const contactsOperations = require("../../model/contacts");

const put = async (req, res, next) => {
  const result = await contactsOperations.updateContact(
    req.params.contactId,
    req.body
  );

  if (!result) {
    throw new NotFound("Not found.");
  }
  sendSuccessRes(res, { result });
};

module.exports = put;
