const Contacts = require("../repository/contacts");

const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    res.json({ status: "success", code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
};

const gatContact = async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);
    if (!contact) {
      return res
        .status(404)
        .json({ status: "error", code: 404, message: "Not found" });
    }
    return res
      .status(200)
      .json({ status: "success", code: 200, data: { contact } });
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    res.status(201).json({ status: "success", code: 201, data: { contact } });
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const contacts = await Contacts.removeContact(req.params.contactId);
    res.status(204).json();
  } catch (error) {
    res
      .status(404)
      .json({ status: "error", code: 404, message: error.message });
    next(error);
  }
};

const changeContact = async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body
    );

    if (!contact) {
      return res
        .status(404)
        .json({ status: "error", code: 404, message: "Not found" });
    }
    return res
      .status(200)
      .json({ status: "success", code: 200, data: { contact } });
  } catch (error) {
    next(error);
  }
};

const changeStatusContact = async (req, res, next) => {
  try {
    const contact = await Contacts.updateStatusContact(
      req.params.contactId,
      req.body
    );

    if (!contact) {
      return res
        .status(404)
        .json({ status: "error", code: 404, message: "Not found" });
    }
    return res
      .status(200)
      .json({ status: "success", code: 200, data: { contact } });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  gatContact,
  createContact,
  deleteContact,
  changeContact,
  changeStatusContact,
};
