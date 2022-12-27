const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");
const contactsSchema = require("../schemas/contactSchema");

exports.contacts_list = async (req, res) => {
  try {
    const data = await listContacts();
    res.json(data).status(200);
  } catch (error) {
    res.json({ message: error.message }).status(500);
  }
};

exports.contact_get = async (req, res) => {
  try {
    const data = await getContactById(req.params.contactId);
    if (!data) {
      throw new Error("Not found");
    }
    res.json(data).status(200);
  } catch (err) {
    res.json({ message: err.message }).status(404);
  }
};

exports.contact_create_post = async (req, res, next) => {
  try {
    const { error, value } = contactsSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      throw new Error(JSON.stringify(error.details));
    }
    const contact = await addContact(value);
    return res.status(201).json(contact);
  } catch (err) {
    res.json(JSON.parse(err.message)).status(400);
  }
};

exports.contact_delete = async (req, res, next) => {
  try {
    const data = await removeContact(req.params.contactId);
    if (!data) {
      throw new Error();
    }
    return res.json({ message: "contact deleted" }).status(200);
  } catch (err) {
    res.json({ message: "Not found" }).status(404);
  }
};

exports.contact_update_put = async (req, res, next) => {
  try {
    const { error, value } = contactsSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      throw new Error(JSON.stringify(error.details));
    }
    const contact = await updateContact(req.params.contactId, value);
    return res.json(contact).status(200);
  } catch (err) {
    res.json(JSON.parse(err.message)).status(404);
  }
};
