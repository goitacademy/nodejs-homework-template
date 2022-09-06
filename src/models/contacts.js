const { ContactModel } = require("../db/schema");

async function listContacts(req, res) {
  try {
    const data = await ContactModel.find({});
    return res.status(200).json(data);
  } catch (e) {
    res.status(404).json({ message: "Not found" });
  }
}

async function getContactById(req, res) {
  const { contactId } = req.params;
  try {
    const data = await ContactModel.findById(contactId);
    if (!data) {
      throw new Error();
    }
    return res.status(200).json(data);
  } catch (e) {
    return res.status(404).json({ message: "Not found" });
  }
}

async function removeContact(req, res) {
  const { contactId } = req.params;
  try {
    const data = await ContactModel.findByIdAndRemove(contactId);
    if (!data) {
      throw new Error();
    }
    return res.status(200).json({ message: "contact deleted" });
  } catch (e) {
    return res.status(404).json({ message: "Not found" });
  }
}

async function addContact(req, res) {
  const { name, email, phone, favorite } = req.body;
  try {
    await ContactModel.create({ name, email, phone, favorite });
    return res.status(201).json({ message: "add contact" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function updateContact(req, res) {
  try {
    const { contactId } = req.params;
    if (!req.body) {
      return res.status(400).json({ message: "missing fields" });
    }
    await ContactModel.findByIdAndUpdate(contactId, req.body);
    const data = await ContactModel.findById(contactId);
    if (!data) {
      throw new Error();
    }
    return res.status(200).json(data);
  } catch (e) {
    res.status(404).json({ message: "Not found" });
  }
}

async function updateStatusContact(req, res) {
  try {
    const { contactId } = req.params;
    if (!req.body) {
      return res.status(400).json({ message: "missing field favorite" });
    }
    await ContactModel.findByIdAndUpdate(contactId, req.body);
    const data = await ContactModel.findById(contactId);
    if (!data) {
      throw new Error();
    }
    return res.status(200).json(data);
  } catch (e) {
    res.status(404).json({ message: "Not found" });
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
