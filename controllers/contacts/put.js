const { NotFound } = require("http-errors");
const { sendSuccessRes } = require("../../helpers");
const { Contact } = require("../../models/contact/contact");

const put = async (req, res) => {
  const result = await Contact.updateContact(req.params.contactId, req.body);

  if (!result) {
    throw new NotFound("Not found.");
  }
  sendSuccessRes(res, { result });
};

module.exports = put;
