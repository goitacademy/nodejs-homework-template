const Contact = require("../models/model_contact");
const { HttpError } = require("../helpers");

const getContactIdCtrl = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw HttpError(404, "Not Found");
  }

  res.json({
    status: "Success",
    code: 200,
    data: {
      result: contact,
    },
  });
};

module.exports = getContactIdCtrl;
