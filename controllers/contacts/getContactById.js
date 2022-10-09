// const contactsOperations = require("../../models/contacts");
const createError = require("http-errors");
const {Contact} = require('../../models/contact');

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw createError(404, `Contact with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: result,
  });
};

module.exports = getContactById;
