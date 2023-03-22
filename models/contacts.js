const { Contact} = require('../db/contactModel')

const Joi = require("joi");

const contactsJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const favoriteContactsJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
});



const listContacts = async (req, res) => {
  const { _id } = req.user;
  const contacts = await Contact.find({owner: _id });
  res.json({contacts})
};



const getContactById = async (req, res) => {
  const { contactId } = req.params;
  
  const contact = await Contact.findById(contactId);
  
  if (!contact) {
    return res.status(400).json({
      status: 'failure, no contacts found!', 
    });
}
  
  res.json({ contact, status: 'success' });
};


const removeContact = async (req, res) => {
  const { contactId } = req.params;
  await Contact.findByIdAndRemove(contactId);
  res.json({ status: 'success' })
};



const addContact = async (req, res) => {
  const { error } = contactsJoiSchema.validate(req.body);
  if (error) {
    error.message = "missing required name field";
    error.status = 400;
    throw error;
  }
  
  const { name, email, phone, favorite } = req.body;
  const { _id } = req.user; 
  const contact = new Contact({name, email, phone, favorite, owner: _id})
  await contact.save();
  res.json({ status: 'success' });
};



const updateContact = async (req, res) => {
  const { error } = contactsJoiSchema.validate(req.body);
  if (error) {
    error.message = "missing required name field";
    error.status = 400;
    throw error;
  }
  const { contactId } = req.params;
  const { name, email, phone, favorite} = req.body;
  await Contact.findByIdAndUpdate(contactId,
    { $set: { name, email, phone, favorite} }
  );
  res.json({ status: 'success' });
};

const updateStatusContact = async (req, res) => {
  const { error } = favoriteContactsJoiSchema.validate(req.body);
  if (error) {
    error.message = "missing required name field";
    error.status = 400;
    throw error;
  }
  const { contactId } = req.params;
  const { favorite} = req.body;
  await Contact.findByIdAndUpdate(contactId,
    { $set: { favorite} }
  );
  res.json({ status: 'success' });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}
