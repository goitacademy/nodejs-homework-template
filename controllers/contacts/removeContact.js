const { Contact } = require("../../models");

const { ctrlWrapper, HttpError } = require("../../helpers");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove({_id: contactId});
  if (!result) throw HttpError(404, "Not found");

  res.json({
    message: "Сontact deleted",
  });
};

module.exports = {removeContact: ctrlWrapper(removeContact)};