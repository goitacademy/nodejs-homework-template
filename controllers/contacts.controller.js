const { Contact } = require("../models/contact");
const listContacts = async (req, res) => {
  try {
    const authenticatedUserId = req.user.id;
    const contacts = await Contact.find({ owner: authenticatedUserId });
    res.json(contacts);
  } catch (error) {
    console.error("Error retrieving contacts:", error);
    res.status(500).json({ error: "Server error" });
  }
};
const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    if (id !== -1) {
      res.status(200).json(contact);
    }
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};
const removeContact = async (req, res) => {
  try {
    const { id } = req.params;
    const removedContact = await Contact.findByIdAndRemove(id);
    if (!removedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    return res.status(404).json({ message: "Not found" });
  }
};

const addContact = async (req, res) => {
  const { user } = req;
  try {
    const newContact = await await Contact.create({
      ...req.body,
      owner: user.id,
    });
    res.status(201).json(newContact);
  } catch (error) {
    console.error("Error adding contact:", error);
    res.status(500).json({ error: "Server error" });
  }
};
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedContact) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    if (!req.body) {
      res.status(400).json({ message: "Missing fields" });
      return;
    }
    return res.status(200).json(updatedContact);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};
const updateStatusContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      { new: true }
    );
    if (!updatedContact) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    if (!Object.hasOwnProperty.call(req.body, "favorite")) {
      return res.status(400).json({ message: "missing field favorite" });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    return res.status(404).json({ message: "Not found" });
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
