const { contactSchema } = require("../../models");
const { RequestError } = require("../../helpers");

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await contactSchema.Contact.findOneAndUpdate({ _id: contactId, owner: owner }, req.body, { new: true });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateContactById;
