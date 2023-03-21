const { Contact } = require("../../models/contact");
const createError = require("http-errors");

const remove = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);

  if (!result) {
    throw createError(404, "not found");
  }

  res.status(200).json({ message: "contact deleted" });
};

module.exports = remove;
