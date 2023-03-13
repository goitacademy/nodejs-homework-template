const contacts = require('../models/contacts');

function getRandomId(min, max) {
    return `${Math.floor(Math.random() * max) + min}`
  }

exports.getContactsList=async (req, res, next) => {   
    res.status(200).json(await contacts.listContacts())  
};

exports.getContactById= async (req, res, next) => {
    const {contactId} = req.params;     
    const contact = await contacts.getContactById(contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Not found' })
    }
    res.status(200).json(contact);
};

exports.createContact=async (req, res, next) => {      
    const {name,email,phone} = req.body;
    if (!name || !email || !phone) {           
       return  res.status(400).json({ message: "missing required name field" })
    } else {
        const id=getRandomId(1,100)
        res.status(201).json(await contacts.addContact(id,name,email,phone));
    }     
};

exports.deleteContactById= async (req, res, next) => {
    const {contactId} = req.params;
    const contact = await contacts.getContactById(contactId);
    if (contact) {
      await contacts.removeContact(contactId)
      res.status(200).json({ message: 'contact deleted' })
    } else {
      res.status(404).json( {message: 'Not found'});  
    }  
};

exports.putUpdateContact = async (req, res, next) => {
    const {contactId} = req.params; 
    const {name,email,phone} = req.body;
    const contact = await contacts.getContactById(contactId);

    if (!name || !email || !phone) {           
        return  res.status(400).json({ message: `missing fields` })
    }else if (!contact){
        return res.status(404).json({ message: 'Not found' })
    }     
    res.status(200).json(await contacts.updateContact(contactId,name,email,phone));
};



   