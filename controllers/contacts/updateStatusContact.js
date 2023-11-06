const { Contact } = require("../../models/Contact");

const { HttpError } = require("../../helpers");

const { ctrlWrapper } = require("../../decorators");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

module.exports = ctrlWrapper(updateStatusContact);
