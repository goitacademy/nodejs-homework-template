const { NotFound } = require("http-errors");
const { sendSuccessRes } = require("../../helpers");
const contactsOperations = require("../../model/contacts");

const removeById = async (req, res, next) => {
  const result = await contactsOperations.removeContact(req.params.contactId);

  if (!result) {
    throw new NotFound("Not found.");
  }
  sendSuccessRes(res, { message: "Success delete" });
};

module.exports = removeById;
