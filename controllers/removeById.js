const { Contact } = require("../models/contactsShema");
const { createError } = require("../helpers");
const removeById = async (req, res) => {
  console.log("remove");
  const { id } = req.body;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw createError(404);
  }
  res.json({
    message: "Book deleted",
  });
};

module.exports = removeById;
