const contacts = require("../models/contacts");
const { createSchema, updateSchema } = require("../schemas/contacts");

const getAll = async (req, res) => {
  try {
    const result = await contacts.listContacts();
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
  }
};

const getById = async (req, res) => {
  try {
    const contact = await contacts.getContactById(req.params.id);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error(error);
  }
};

const create = async (req, res) => {
  try {
    const { error } = createSchema.validate(req.body);

    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const contact = await contacts.addContact(req.body);

    res.status(201).json(contact);
  } catch (error) {
    console.error(error);
  }
};

const remove = async (req, res) => {
  try {
    const result = await contacts.removeContact(req.params.id);

    if (result) {
      res.status(200).json({ message: "contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error(error);
  }
};

const update = async (req, res) => {
  try {
    const { error } = updateSchema.validate(req.body);

    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const contact = await contacts.updateContact(req.params.id, req.body);

    if (contact) {
      return res.status(200).json(contact);
    }

    res.status(404).json({ message: "Not found" });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
    getAll,
    getById,
    create,
    remove,
    update
};
