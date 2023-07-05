const Contact = require("../middleware/contacts");

const getContacts = async (req, res, next) => {
  try {
    console.log(req.method);
    const contacts = await Contact.listContacts();
    res.json({ status: "success", code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const contact = await Contact.getContactById(req.params.id);
    console.log(contact);
    console.log(contact.id);
    if (contact) {
      console.log(`Contact ${contact} found`);
      return res
        .status(200)
        .json({ status: "success", code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not Found" });
  } catch (error) {
    next(error);
  }
};

const saveContact = async (req, res, next) => {
  try {
    const contact = await Contact.addContact(req.body);
    console.log(`Contact successfully ${contact} added`);
    res.status(201).json({ status: "success", code: 201, data: { contact } });
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const contact = await Contact.removeContact(req.params.id);
    console.log(`Contact successfully ${contact} removed`);
    if (contact) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not Found" });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    console.log(req.method);
    const contact = await Contact.updateContact(req.params.id, req.body);
    if (contact) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not Found" });
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const contact = await Contact.updateContact(req.params.id, req.body);
    if (contact) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not Found" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContact,
  getContacts,
  removeContact,
  saveContact,
  updateContact,
  updateStatusContact,
};
