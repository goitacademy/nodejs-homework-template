const Contact = require("../../model/contacts");
const createError = require("http-errors");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  console.log(contact);

  if (!contact) {
    throw createError(404, "Not found");
  }
  res.json({
    status: "Succsess",
    code: 200,
    result: contact,
  });
};

module.exports = getById;
