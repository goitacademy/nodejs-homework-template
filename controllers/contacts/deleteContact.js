const createError = require("http-errors");

const Contact = require("../../model/contacts");
const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const dlt = await Contact.findByIdAndDelete(contactId);
  if (!dlt) {
    throw createError(404, "Not found");
  }
  res.json({
    status: "succsess",
    code: 200,
    message: "contact deleted",
    result: dlt,
  });
};

module.exports = deleteContact;
