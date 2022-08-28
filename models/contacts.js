const { ObjectId } = require("mongodb");
const { Contact } = require("../db/contactsModel");

const listContacts = async (req, res, next) => {
  try {
    const data = await Contact.find({});
    return res.json(data);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const getContactById = async (req, res, next) => {
  try {
    const data = await Contact.findOne({
      _id: ObjectId(String(req.params.contactId)),
    });
    if (data) {
      return res.json(data);
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const removeContact = async (req, res, next) => {
  try {
    const dataId = await Contact.deleteOne({
      _id: new ObjectId(String(req.params.contactId)),
    });
    if (dataId.deletedCount) {
      return res.status(200).json({ message: "contact deleted" });
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const addContact = async (req, res, next) => {
  try {
    await Contact.create(req.body);
    return res.status(201).json({ message: "add contact" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateContact = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  if (!req.body) {
    return res.status(400).json({ message: "missing fields" });
  }
  const dataId = await Contact.findByIdAndUpdate(
    {
      _id: ObjectId(String(req.params.contactId)),
    },
    { name, email, phone, favorite }
  );

  if (!dataId) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ message: "contact update" });
};

const updateStatusContact = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  const { name, phone, email, favorite } = req.body;
  const dataId = await Contact.findByIdAndUpdate(
    {
      _id: ObjectId(String(req.params.contactId)),
    },
    { name, phone, email, favorite }
  );
  if (!dataId) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ message: "contact update" });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
