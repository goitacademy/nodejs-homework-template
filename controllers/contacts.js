const Contacts = require("../models/contacts");

const listContacts = async (req, res, next) => {
  try {
    const contacts = await Contacts.find();
    res.send(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await Contacts.findById(contactId);
    if (contact === null) {
      res.status(404).send({ message: "Not found" });
    }
    res.send(contact);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await Contacts.findByIdAndDelete(contactId);
    console.log({ contact });
    if (contact === null) {
      res.send(404).send("Contact not found");
    }
    res.send({ contactId });
  } catch (error) {
    next();
  }
};

const addContact = async (req, res, next) => {
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  };

  try {
    const result = await Contacts.create(contact);
    res.status(201).send(result);
  } catch (error) {
    if (error.name === "ValidationError") {
      error.message = `${error.errors.phone.value} is not a valid phone number! Please use the format (XXX) XXX-XXXX`;
    }
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  };

  try {
    const result = await Contacts.findByIdAndUpdate(contactId, contact, {
      new: true,
    });
    if (result === null) {
      return res.status(404).send("Contact not found");
    }

    res.send(result);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const status = {
    favorite: req.body.favorite,
  };

  try {
    const result = await Contacts.findByIdAndUpdate(contactId, status, {
      new: true,
    });
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "missing field favorite" });
    }

    res.send(result);
  } catch (error) {
    next(error);
  }

  res.end();
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
