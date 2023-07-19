const { v4: uuidv4 } = require("uuid");
const {
  createContactSchema,
  updateContactSchema,
} = require("../routes/api/validators");
const Contact = require("../models/contacts");

async function getAllContacts(req, res) {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

async function getOneContact(req, res) {
  const { id } = req.params;
  try {
    const contact = await Contact.findById(id);
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

async function createContact(req, res) {
  const { name, email, phone } = req.body;
  const { error } = createContactSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  } else {
    try {
      const newContact = new Contact({
        id: uuidv4(),
        name,
        email,
        phone,
      });
      await newContact.save();
      res.status(201).json(newContact);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
}

async function deleteContact(req, res) {
  const { id } = req.params;
  try {
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (deletedContact) {
      res.json({ message: "Contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

async function updateContact(req, res) {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const { error } = updateContactSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  } else {
    try {
      const contact = await Contact.findById(id);
      if (contact) {
        contact.name = name || contact.name;
        contact.email ||= email;
        contact.phone ||= phone;
        await contact.save();
        res.json(contact);
      } else {
        res.status(404).json({ message: "Not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
}

async function toggleFavorite(req, res) {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (!favorite) {
    return res.status(400).json({ message: "Missing field 'favorite'" });
  }

  try {
    const contact = await Contact.findById(contactId);
    if (contact) {
      contact.favorite = favorite;
      await contact.save();
      res.json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  getAllContacts,
  getOneContact,
  createContact,
  deleteContact,
  updateContact,
  toggleFavorite,
};
