const { contactSchema } = require("../../models");
const { RequestError } = require("../../helpers");

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await contactSchema.Contact.findOneAndRemove({ _id: contactId, owner: owner });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = deleteContactById;
