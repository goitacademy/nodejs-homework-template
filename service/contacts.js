const { ContactsModel } = require("../contacts.model");

const listContacts = async (req, res) => {
  try {
    const contacts = await ContactsModel.find();
    res.json(contacts);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (req, res) => {
  try {
    const id = req.params.contactId;
    const cont = await ContactsModel.findById(id);
    res.json(cont);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: "Not found" });
  }
};

const removeContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    await ContactsModel.findByIdAndRemove(id);
    res.json({ message: "contact deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: "Not found" });
  }
};

const addContact = async (req, res, next) => {
  try {
    const newContact = await ContactsModel.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "missing required name field" });
  }
};

const updateContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const isFieldExist = Object.keys(req.body).length;
    if (!isFieldExist)
      return res.status(400).json({ message: "missing fields" });
    else {
      const updContact = await ContactsModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updContact);
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
      const updContact = await ContactsModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updContact);
    }
  } catch (error) {
    res.status(404).json({ message: "Not found" });
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
