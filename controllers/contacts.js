const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../models/contacts')
const { contactValidation } = require('../validation/contacts')
const { v4: uuidv4 } = require('uuid')

const getAllContacts = async(req, res) => {
    res.json({
    status: 'success',
    code: 200,
    data: await listContacts(),
  });
}

const getContact = async (req, res) => {
try {
  const { contactId } = req.params;
  const findContactById = await getContactById(contactId)
  if (findContactById) {
    res.json({
      status: 'success',
      code: 200,
      data: findContactById,
    });
  } if (!findContactById) {
    res.json({
      status: 'error',
      code: 404,
      message: "Not found"
    })
  }
  } catch (err) {
    console.log(err)
  }
}

const createContact = async (req, res) => {
     try {
    const { error } = contactValidation(req.body);

  if (error) {
    res.json({
      status: 'error',
      code: 400,
      message: error.details[0].message,
    });
  }

  const {name, email, phone} = req.body
  const newContact = {
    id: uuidv4(),
    name: name,
    email,
    phone
  }
 res.status(201).json({
    status: 'success',
    code: 201,
    data: newContact,
    
 });
  addContact(newContact)
  } catch (error) {
    console.log(error)
  }
}

const deliteContact = async (req, res) => {
     try {
    const { contactId } = req.params;
    const delitedContact = await removeContact(contactId)

  if (delitedContact.length > 0) {
    res.status(200).json({
    status: 'success',
    code: 200,
    message: 'contact is deleted',
    data: delitedContact
    });
    
  } if (delitedContact.length === 0) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `contact with ${contactId} is not in DataBase`
    })
  }
  } catch (error) {
    console.log(error)
  }
}

const changeContact = async (req, res) => {
try {
    const { error } = contactValidation(req.body);

  if (error) {
    res.json({
      status: 'error',
      code: 400,
      message: error.details[0].message,
    });
  }

  const  {contactId}  = req.params;
  const updatedContact = await updateContact(contactId, req.body)
  console.log(updateContact)
   
  if (updateContact) {
    res.json({
      status: 'success',
      code: 200,
      data: updatedContact,
    });
  } if (!updateContact) {
      res.json({
      status: 'error',
      code: 404,
      message: 'Not found',
    });
  }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
    getAllContacts,
    getContact,
    createContact,
    deliteContact,
    changeContact
}