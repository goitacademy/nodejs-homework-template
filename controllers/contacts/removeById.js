const { Contact } = require("../../models/contacts");
const { createError } = require("../../helpers");

const removeById = async (req, res) => {
  const id = req.params.contactId;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw createError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

module.exports = removeById;
