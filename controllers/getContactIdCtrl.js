const { contacts } = require("../models/contacts");
const { HttpError } = require("../helpers/index");

const getContactIdCtrl = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contacts.getContactById(contactId);
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
