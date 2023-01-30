// const contactOperations = require("../../models/contacts");
const { Contact } = require("../../models/contactsModel");

const { NotFound } = require("http-errors");

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw new NotFound(`Contact with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: `contact id=${id} delete`,
    data: { result },
  });
};

module.exports = removeContact;
