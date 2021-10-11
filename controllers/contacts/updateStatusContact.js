const { NotFound } = require("http-errors");
const { sendSuccessRes } = require("../../helpers");
const { Contact } = require("../../models/contact");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    req.params.contactId,
    req.body
  );

  if (!result) {
    throw new NotFound("Not found");
  }
  sendSuccessRes(res, { result });
};

module.exports = updateStatusContact;
