const Contacts = require("../repository/contacts");
const CustomError = require("../helpers/customError");

const getContacts = async (req, res, next) => {
  // console.log(req.method);
  console.log(req.query);

  const userId = req.user._id;
  const data = await Contacts.listContacts(userId, req.query);
  res.json({ status: "success", cod: 200, data: { ...data } });
};

const getContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.getContactById(req.params.contactId, userId);
  // console.log(req.params);

  console.log(contact);
  console.log(contact.id);
  if (contact) {
    return res
      .status(200)
      .json({ status: "success", cod: 200, data: { contact } });
  }
  throw new CustomError(404, "Not found");

  // return res
  //   .status(404)
  //   .json({ status: "error", cod: 404, message: "Not found" });
};

const createContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.addContact({ ...req.body, owner: userId });
  res.status(201).json({ status: "success", cod: 201, data: { contact } });
};

const deleteContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.removeContact(req.params.contactId, userId);
  if (contact) {
    return res.status(200).json({
      status: "success",
      cod: 200,
      message: "contact deleted",
      data: { contact },
    });
  }
  throw new CustomError(404, "Not found");
};

const updateContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.updateContact(
    req.params.contactId,
    req.body,
    userId
  );
  if (contact) {
    return res
      .status(200)
      .json({ status: "success", cod: 200, data: { contact } });
  }
  throw new CustomError(404, "Not found");
};

const updateStatusFavoriteContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.updateContact(
    req.params.contactId,
    req.body,
    userId
  );
  if (contact) {
    return res
      .status(200)
      .json({ status: "success", cod: 200, data: { contact } });
  }
  throw new CustomError(404, "Not Found");
};
module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
  updateStatusFavoriteContact,
};
