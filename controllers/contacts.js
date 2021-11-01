const Contacts = require("../repository/contacts");
const { CustomError } = require("../helpers/customError");

const getContacts = async (req, res) => {
  const userId = req.user._id;
  const data = await Contacts.listContacts(userId, req.query);
  res.json({ status: "success", code: 200, data: { ...data } });
};

const gatContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.getContactById(req.params.contactId, userId);
  if (!contact) {
    throw new CustomError(404, "Not found");
  }
  return res
    .status(200)
    .json({ status: "success", code: 200, data: { contact } });
};

const createContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.addContact({ ...req.body, owner: userId });
  res.status(201).json({ status: "success", code: 201, data: { contact } });
};

const deleteContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.removeContact(req.params.contactId, userId);
  if (contact) {
    return res
      .status(200)
      .json({ status: "success", code: 200, data: { contact } });
  }
  throw new CustomError(404, "Not found");
};

const changeContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.updateContact(
    req.params.contactId,
    req.body,
    userId
  );

  if (!contact) {
    throw new CustomError(404, "Not found");
  }
  return res
    .status(200)
    .json({ status: "success", code: 200, data: { contact } });
};

const changeStatusContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.updateStatusContact(
    req.params.contactId,
    req.body,
    userId
  );

  if (!contact) {
    throw new CustomError(404, "Not found");
  }
  return res
    .status(200)
    .json({ status: "success", code: 200, data: { contact } });
};

module.exports = {
  getContacts,
  gatContact,
  createContact,
  deleteContact,
  changeContact,
  changeStatusContact,
};
