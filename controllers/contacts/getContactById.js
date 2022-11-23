const { contactSchema } = require("../../models");
const { RequestError } = require("../../helpers");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await contactSchema.Contact.findOne({ _id: contactId, owner: owner });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

module.exports = getContactById;
