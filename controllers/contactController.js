const fs = require("fs").promises;
const uuid = require("uuid").v4;
const contacts = require("../models/contacts.json");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");
const { log } = require("console");
const Joi = require("joi");

const addShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

exports.getContact = async (req, res) => {
  try {
    const contacts = await listContacts();

    res.status(200).json(contacts);
  } catch (err) {
    console.log(err);
  }
};

exports.findContact = async (req, res, next) => {
  const { id } = req.params;

  try {
    console.log("id: " + id);

    const contact = await getContactById(id);
    console.log(contact);

    if (!contact) {
      console.log("404");

      throw error;
    }
    console.log("200");
    res.status(200).json({ contact });
  } catch (error) {
    console.log("404 - 2");
    res.status(404).json({
      status: "error",
      message: "Not found1",
    });
  }
};

exports.createContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const { error } = addShema.validate(req.body);

    if (error) {
      const error = new Error("missing required name field");
      error.status = 400;
      throw error;
    }

    const newContact = {
      id: uuid(),
      name: name,
      email: email,
      phone: phone,
    };

    await addContact(newContact);

    res.status(201).json({
      contact: newContact,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send("missing required name field");
  }
};

exports.deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const isRemoved = await removeContact(id);

    if (!isRemoved) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    res.status(200).json({ message: "contact deleted" });
  } catch (err) {
    next(err);
  }
};

exports.removeContact = async (req, res, next) => {
  try {
    console.log("remove contact");
    const { error } = addShema.validate(req.body);
    if (error) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }

    const { id } = req.params;

    const newContact = await updateContact(id, req.body);
    if (!newContact) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      contacts: newContact,
    });
  } catch (err) {
    console.log(err);
    res.status(404).send("Not found");
  }
};
