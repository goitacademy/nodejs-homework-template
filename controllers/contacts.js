const path = require("path");
const contactsSchemas = require("../schemas/contacts");
const contactsPath = path.join(__dirname, "../db/contacts.json");
const fs = require("fs/promises");
const Contact = require("../models/contacts");

async function getAll(req, res, next) {
  try {
    const docs = await Contact.find().exec();
    return res.send(docs);
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  const { contactId } = req.params;

  try {
    const doc = await Contact.findById(contactId).exec();

    if (doc === null) {
      return res.status(404).json({ message: "Contact not found" });
    }
    return res.send(doc);
  } catch (error) {
    next(error);
  }
}

async function add(req, res, next) {
  const response = contactsSchemas.validate(req.body);
  if (typeof response.error !== "undefined") {
    console.log(response.error);
    return res.status(400).send({ message: "missing required name field" });
  } else {
    try {
      const { name, email, phone, favorite } = req.body;
      const newContact = {
        name: name,
        email: email,
        phone: phone,
        favorite: favorite,
      };
      const doc = await Contact.create(newContact);
      return res.send(doc);
    } catch (error) {
      next(error);
    }
  }
}

async function remove(req, res) {
  const { contactId } = req.params;
  try {
    const doc = await Contact.findByIdAndDelete(contactId).exec();

    if (doc === null) {
      return res.status(404).json({ message: "Contact not found" });
    }
    return res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const contactId = req.params.contactId;
    const response = contactsSchemas.validate(req.body);
    if (typeof response.error !== "undefined") {
      console.log(response.error);
      return res.status(400).send({ message: "missing required name field" });
    }
    const { name, email, phone, favorite } = req.body;
    const newContact = {
      name: name,
      email: email,
      phone: phone,
      favorite: favorite,
    };

    const doc = await Contact.findByIdAndUpdate(contactId, newContact, {
      new: true,
    }).exec();
    console.log(doc);
    if (doc === null) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.send(doc);
  } catch (error) {
    next(error);
  }
}

async function isFavorite(req, res, next) {
  try {
    const contactId = req.params.contactId;
    const { favorite } = req.body;
    console.log(contactId);

    if (favorite === undefined) {
      return res.status(400).json({ message: "missing favorite field" });
    }
    const { name, email, phone } = req.body;
    const newContact = {
      name: name,
      email: email,
      phone: phone,
      favorite: favorite,
    };
    const doc = await Contact.findByIdAndUpdate(contactId, newContact, {
      new: true,
    }).exec();

    if (doc === null) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.send(doc);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
  isFavorite,
};
