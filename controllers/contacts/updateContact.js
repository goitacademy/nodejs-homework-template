const { HttpError } = require("../../utils/index");
const { Contact } = require("../../models/contact");

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found user with this ID!");
  }
  res.json(result);
};

module.exports = updateContact;
