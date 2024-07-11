const Contact = require('../models/contacts');

const getContactsTest = async (req, res) => {
  try {
    const contacts = await Contact.find({ owner: req.user.id });
    res.json({ contacts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createContact = async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  const newContact = new Contact({
    name,
    email,
    phone,
    favorite,
    owner: req.user.id,
  });

  try {
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 

const update = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, favorite } = req.body;

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      { _id: id, owner: req.user.id },
      { name, email, phone, favorite },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findOne({ _id: id, owner: req.user.id });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedContact = await Contact.findOneAndRemove({ _id: id, owner: req.user.id });

    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getContactsTest,
  createContact, 
  update, 
  remove, 
  getById
};
