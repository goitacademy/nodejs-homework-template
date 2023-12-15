const { getContactById } = require("../../models/contacts/index");
const HttpError = require("../../helpers/HttpError");

const getContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (contact) {
    res.json(contact.toObject({ versionKey: false }));
  } else {
    next(new HttpError(404, "Not Found"));
  }
};

module.exports = getContact;
