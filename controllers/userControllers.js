// const fs = require("fs").promises;
// const uuid = require("uuid").v4;

const {
  listContacts,
  createContact,
  removeContact,
  recieveContactById,
  updateContact,
} = require("../models/contacts");

exports.getContacts = async (req, res) => {
  try {
    const contacts = await listContacts();

    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({
      msg: err.msg,
    });
  }
};

exports.addContact = async (req, res, body) => {
  try {
    const contacts = await createContact(req.body);
    console.log(contacts);
    res.status(201).json(contacts);
  } catch (err) {
    res.status(500).json({
      msg: err.msg,
    });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const { contactId } = req.params;

    const contact = await removeContact(contactId);

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({ message: "contact deleted" });
  } catch (err) {
    console.error(err);
  }
};

exports.getContactById = async (req, res) => {
  try {
    const { contactId } = req.params;

    const contacts = await recieveContactById(contactId);

    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({
      msg: err.msg,
    });
  }
};

exports.updateContactById = async (req, res, next) => {
  try {
    if (JSON.stringify(req.body) === "{}") {
      return res.status(404).json({ message: "Missing fields" });
    }

    const newContact = await updateContact(req.params.contactId, req.body);

    if (!newContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(newContact);
  } catch (err) {
    res.status(500).json({
      msg: err.msg,
    });
  }
};
