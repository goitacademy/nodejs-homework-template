const { Contact } = require("../models/contactsShema");
const { createError } = require("../helpers");

const getById = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  const result = await Contact.findById(id);
  //   const result = await Contact.findOne({ _id: id });
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = getById;
