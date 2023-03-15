const { Contact} = require('../db/contactModel')

const Joi = require("joi");

const contactsJoiSchema = Joi.object({
name: Joi.string().required(),
email: Joi.string().email().required(),
phone: Joi.string()
.regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
.required(),
});



const listContacts = async (req, res) => {
  const contacts = await Contact.find({});
  res.json({contacts})
};



const getContactById = async (req, res) => {
  const {contactId} = req.params;
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
  const contact = new Contact({name, email, phone, favorite})
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



module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
