const HttpError = require('../helpers/HttpError');
const { Contact } = require('../models/Contact');


const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);

  if (contact) {
    res.json(contact);
  } else {
    throw new HttpError(404, `Contact with id=${id} not found`);
  }
};

const add = async (req, res) => {
  const { name, email, phone } = req.body;
  const newContact = new Contact({ name, email, phone });

  await newContact.save();

  res.status(201).json(newContact);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findByIdAndDelete(id);

  if (contact) {
    res.json({ message: 'Contact deleted' });
  } else {
    throw new HttpError(404, `Contact with id=${id} not found`);
  }
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const updatedContact = await Contact.findByIdAndUpdate(id, { name, email, phone }, { new: true });

  if (updatedContact) {
    res.json(updatedContact);
  } else {
    throw new HttpError(404, `Contact with id=${id} not found`);
  }
};


const updateStatusContact = async (contactId, { favorite }) => {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );
  
    if (!updatedContact) {
      throw new HttpError(404, `Contact with id=${contactId} not found`);
    }
  
    return updatedContact;
  };

module.exports = {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
  updateStatusContact
};