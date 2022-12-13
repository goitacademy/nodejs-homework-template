const { NotFound } = require("http-errors");
const { Contact } = require("../../models/contact");

async function removeContact(req, res) {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw new NotFound();
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      result,
    },
  });
}

module.exports = removeContact;
