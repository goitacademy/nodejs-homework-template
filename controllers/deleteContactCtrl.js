const { contacts } = require("../models/contacts");
const { HttpError } = require("../helpers/index");

const deleteContactCtrl = async (req, res) => {
  const { contactId } = req.params;
  const deleteContact = await contacts.removeContact(contactId);
  
  if (!deleteContact) {
    throw HttpError(404, "Not Found");
  }

  res.json({
    status: "contact deleted",
    code: 200,
    data: {
      result: deleteContact,
    },
  });
};

module.exports = deleteContactCtrl;
