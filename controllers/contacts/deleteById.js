const { Contact } = require("../../models/Contact");

const { HttpError } = require("../../helpers");

const { ctrlWrapper } = require("../../decorators");

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json({
    message: "Delete success",
  });
};

module.exports = ctrlWrapper(deleteById);
