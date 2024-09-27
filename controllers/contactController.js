const {
    listContacts: list,
    getContactById: getById,
    removeContact: remove,
    addContact: add,
    updateContact: update,
  } = require("../models/contacts");
  const Joi = require("joi");
  
  const schemaCreateContacts = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  })
  
  const schemaUpdateContacts = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
  })
  .or("name", "email", "phone")
  
  
  const listContacts = async (req, res, next) => {
    const contacts = await list();
    res.status(200).json(contacts);
  };
  
  const getContactById = async (req, res, next) => {
    const id = req.params.contactId;
    const contact = await getById(id);
    if(!contact){
      res.status(404).json({message: "Not found"});
    }else{
      res.status(200).json(contact)
    }
  };
  
  const addContact = async (req, res, next) => {
    const {name, email, phone} = req.body;
    const { error, value } = schemaCreateContacts.validate({ name, phone, email })
    if (error) {
      return res.status(400).json({ message: "missing required name field" });
    }
    const addContact = await add(value)
    res.json({
      status: 'success',
      code: 201,
      data: {
        addContact
      },
    })
  }
  
  const removeContact = async (req, res, next) => {
    const { contactId } = req.params;
  
    const deleteContact = await remove(contactId)
    if (deleteContact === null) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({
      code: 200,
      message: "contact deleted"
    })
  }
  
  const updateContact =async (req, res, next) => {
    const { contactId } = req.params;
    const { name, phone, email } = req.body;
    const { error, value } = schemaUpdateContacts.validate({ name, phone, email })
  
    if (error) {
      return res.status(400).json({ message: "missing fields" });
    }
  
    const updContact = await update(contactId, value)
  
    if (updContact === null) {
      return res.status(404).json({ message: "Not found" });
    }
  
    res.json({
      status: 'success',
      code: 200,
      data: {
        updContact
      },
    })
  }
  
  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact
  };