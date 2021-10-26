const listContacts = require("../model/listContacts");
const { isEmailInContacts, isPhoneInContacts } = require("../model/helpers");

const checkFieldInContact = async (req, res, next) => {
  const contacts = await listContacts();
  const { email, phone } = req.body;

  if (
    (await isEmailInContacts(contacts, email)) ||
    (await isPhoneInContacts(contacts, phone))
  ) {
    return res
      .status(400)
      .json({ message: "Contact with same email or phone already exists." });
  }

  next();
};

const checkIdInContact = async (req, res, next) => {
  const { contactId } = req.params;

  const contacts = await listContacts();
  const searchedIndex = await contacts.findIndex(
    ({ id }) => id.toString() === contactId.toString()
  );

  if (searchedIndex === -1) {
    return res.status(404).json({ message: "Not found" });
  }

  next();
};

module.exports = {
  checkFieldInContact,
  checkIdInContact,
};
