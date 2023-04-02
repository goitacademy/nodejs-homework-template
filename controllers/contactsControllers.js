const Contacts = require('../models/contactsSchema')


const getListContacts = async (req, res, next) => {
  try {
   
    const contacts = await Contacts.find();

    res.status(200).json({
    contacts,
  });
} catch (err) {
    next(err);
}
}

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
 
    const contactToId = await Contacts.findById(contactId);
    
  if (!contactToId) {
      return res.status(404).json({
        "message": "Not found"
      });
    }  
  res.status(200).json({
    contactToId,
  });
} catch (err) {
  next(err);
}
}

const removeContact = async (req, res, next) => {
  try {
     const { contactId } = req.params;

    await Contacts.findByIdAndDelete(contactId);

  res.status(200).json({"message": "contact deleted"});
  } catch (err) {
     next(err);
  }
}

const addContact = async (req, res, next) => {
  try {

 await Contacts.create(req.body);


 res.status(200).json({"message": "contact create"});
  } catch (err) {
    
   next(err);
  }
  
}

const updateContact = async (req, res, next) => {
  try {
    
    const { phone, email, name } = req.body;
 if (!phone || !email || !name) {
      return res.status(400).json({
        "message": "missing fields"
      });
    }

    const { contactId } = req.params;

    const updatedUser = await Contacts.findByIdAndUpdate(contactId, req.body, { new: true });

    res.status(200).json({
    updatedUser,
    });
  } catch (err) {
   next(err);
}
}

const updateStatusContact = async (req, res, next) => {
  try {
   const { favorite } = req.body;
 if (!req.body) {
      return res.status(400).json({
        "message": "missing fields favorite"
      });
    }
    
    const { contactId } = req.params;

    const updatedStatusContact = await Contacts.findByIdAndUpdate(contactId, { favorite: favorite }, { new: true });

    if (!updatedStatusContact) {
      return res.status(404).json({
        "message": "Not found"
      });
    }  

    res.status(200).json({
    updatedStatusContact,
    });
  } catch (err) {
   next(err);
}
}

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
