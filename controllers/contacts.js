const Contact = require('../models/contact');

const getAllContacts = async (req, res) => {
  const contacts = await Contact.find({ owner: req.user._id });
  res.json(contacts);
};

const getContactById = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return res.status(404).json({ message: 'Contact not found' });
  }
  res.json(contact);
};

const addContact = async (req, res) => {
  const newContact = await Contact.create({ ...req.body, owner: req.user._id });
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updatedContact) {
    return res.status(404).json({ message: 'Contact not found' });
  }
  res.json(updatedContact);
};

const deleteContact = async (req, res) => {
    try {
      const deletedContact = await Contact.findByIdAndDelete(req.params.id);
      
      if (!deletedContact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
  
      res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error while deleting contact' });
    }
  };
  
