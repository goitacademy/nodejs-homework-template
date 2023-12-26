const { listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact } = require("../services/contactsServices");





const getAllContacts = async (req, res, next) => {
    try {
      const contacts = await listContacts();
      res.status(200).json({
        message: "Success: You got the list of contacts",
        contacts
      })
    } catch(error) {
        next(error);
    }
}

const getOneContact = async (req, res) => {
      try {
        const contactById = await getContactById(req.params.id);
    
        res.status(200).json({ 
          message: 'Success: You found contact by ID',
          contactById 
        })
      } catch (error) {
        res.status(404).json({
          message: "Not found",
        })
      }
      
    }

const deleteContact = async (req, res) => {
  try{
    
    await removeContact(req.params.id);

    res.status(200).json({ 
    message: 'contact deleted' })
  } catch (error) {
    res.status(404).json({
      message: "Not found",
    })
  }
  
}


const createContact =  async (req, res) => {
  try {
    
    const newContact = await addContact(req.body);
    res.status(201).json({ 
      message: 'You created new contact',
      newContact })
  } catch (error) {
    res.status(400).json({
      message: "missing required fields",
    })
  }
  
}


const updateContactById =  async (req, res, next) => {
  try{
    const updatedContact = await updateContact(req.params.id, req.body);

    res.status(200).json({ 
    message: 'contact upated',
    updatedContact })
  } catch (error) {
    res.status(404).json({
      message: "Not found",
    })
  }
}

const updateStatusFavourite =  async (req, res, next) => {
    try{
      const updatedStatus = await updateStatusContact(req.params.id, req.body);
  
      res.status(200).json({ 
      message: 'contact upated',
      updatedStatus })
    } catch (error) {
      res.status(404).json({
        message: "Not found",
      })
    }
  }

module.exports = {
    getAllContacts,
    getOneContact,
    deleteContact,
    createContact,
    updateContactById,
    updateStatusFavourite
}