const createError = require("http-errors");
const { Contact } = require("../../models/contact");

const remove = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;

  const result = await Contact.findOneAndDelete({
    _id: contactId,
    owner: _id,
  });

  if (!result) {
    throw createError(404, `Contact with id=${contactId} not found`);
  }
  res.json({
    message: "contact deleted",
  });
};

module.exports = remove;
