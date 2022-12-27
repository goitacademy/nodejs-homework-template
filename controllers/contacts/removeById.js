const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

async function removeContact(req, res) {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
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
