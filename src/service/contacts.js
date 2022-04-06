const { UserModel } = require("../db/contacts.model");

const listContacts = async (req, res, next) => {
  try {
    const contacts = await UserModel.find();
    res.json(contacts);
  } catch (error) {
    console.log(error.message);
  }
};
const getContactById = async (req, res, next) => {
  try {
    const id = req.params.contactId;

    const contact = await UserModel.findById(id);
    res.json(contact);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: "Not found" });
  }
};
const addContact = async (req, res, next) => {
  try {
    const newContact = await UserModel.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "missing required name field" });
  }
};
const removeContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    await UserModel.findByIdAndRemove(id);
    res.json({ message: "contact deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: "Not found" });
  }
};
const updateContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const isFieldExist = Object.keys(req.body).length;
    if (!isFieldExist) {
      return res.status(400).json({ message: "missing fields" });
    } else {
      const upDateContact = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(upDateContact);
    }
  } catch (error) {
    res.status(404).json({ message: "Not found" });
    console.log(error.message);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;

    if (!req.body.favorite)
      return res.status(400).json({ message: "missing field favorite" });
    else {
      const upDateContact = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(upDateContact);
    }
  } catch (error) {
    res.status(404).json({ message: "Not found" });
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
