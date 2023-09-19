const Contact = require("../models/model_contact");
const { HttpError } = require("../helpers");

const deleteContactCtrl = async (req, res) => {
  const { contactId } = req.params;
  const deleteContact = await Contact.findByIdAndRemove(contactId);
  
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
