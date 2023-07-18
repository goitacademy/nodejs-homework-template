const { userDataValidator, userEditDataValidator } = require('../utils');
const Contact = require('../models/contactModel');

const listContacts = async (_, res) => {
  try {
    const contacts = await Contact.find();

    res.status(200).json(contacts);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getContactById = async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const findedContact = await Contact.findById(contactId);

    if (!findedContact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(findedContact);
  } catch (error) {
    res.sendStatus(500);
  }
};

const removeContact = async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const contact = await Contact.findById(contactId);

    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }

    await Contact.findByIdAndDelete(contactId);

    res.status(200).json({ message: 'contact deleted' });
  } catch (error) {
    res.sendStatus(500);
  }
};

const addContact = async (req, res) => {
  try {
    const { error, value } = userDataValidator.validate(req.body);

    if (error) {
      return res.status(400).json({ message: 'missing required name field' });
    }

    const newContact = await Contact.create(value);

    res.status(201).json(newContact);
  } catch (error) {
    res.sendStatus(500);
  }
};

const updateContact = async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const contact = await Contact.findById(contactId);

    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }

    if (!Object.keys(req.body).length) {
      return res.status(400).json({ message: 'missing fields' });
    }

    const { error, value } = userEditDataValidator.validate(req.body);

    if (error) {
      return res.status(400).json({ message: 'invalid data' });
    }

    const { name, email, phone } = value;

    if (name) {
      await Contact.findByIdAndUpdate(contactId, { name }, { new: true });
    }
    if (email) {
      await Contact.findByIdAndUpdate(contactId, { email }, { new: true });
    }
    if (phone) {
      await Contact.findByIdAndUpdate(contactId, { phone }, { new: true });
    }

    const updatedUserData = { name, email, phone };

    res.status(200).json(updatedUserData);
  } catch (error) {
    res.sendStatus(500);
  }
};

const updateStatusContact = async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const contact = await Contact.findById(contactId);

    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }

    if (!Object.keys(req.body).length) {
      return res.status(400).json({ message: 'missing field favorite' });
    }

    const { error, value } = userEditDataValidator.validate(req.body);

    if (error) {
      return res.status(400).json({ message: 'invalid data' });
    }

    const { favorite } = value;

    const updatedUser = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.sendStatus(500);
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
