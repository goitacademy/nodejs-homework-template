const { Contact } = require("../../models/contact");
const createError = require("../../helpers/createError");

const changeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw createError(404, "Not found");
  }
  res.json(result);
};

module.exports = changeContact;
