const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers");

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw createError(404, "Not found");
  }
  res.json({ message: "Contact deleted" });
};

module.exports = deleteById;
