// controllers\contacts.js
const service = require("../services/contacts");
const schema = require("../models/schema");

const listContacts = async (req, res) => {
  // console.log(req.query);
  const result = await service.listContacts();
  res.status(200).json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await service.getContactById(id);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(404).json(result);
  }
};

const removeContact = (req, res) => {
  const { id } = req.params;
  service
    .removeContact(id)
    .then((result) => {
      if (result.success) {
        res.status(200).json({ message: result.message });
      } else {
        res.status(404).json({ message: result.message });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    });
};

const addContact = async (req, res) => {
  try {
    const { body } = req;
    const { error, value } = schema.addContact.validate(body);

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details,
        message: "Invalid input data",
      });
    }

    const result = await service.addContact(value);

    if (result.success) {
      res.status(201).json({ message: result.message });
    } else {
      res.status(400).json({ message: result.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const { error, value } = schema.updateContact.validate(body);

    if (error) {
      return res
        .status(400)
        .json({ message: "Invalid input data", error: error.details });
    }

    const result = await service.updateContact(id, value);

    if (result.success) {
      res.status(200).json({
        success: true,
        result: result.result,
        message: result.message,
      });
    } else {
      res.status(404).json({ success: false, message: result.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
