const Contacts = require('../repositories/contacts');

const getAllContacts = async (req, res, next) => {
    try {
        const contactsList = await Contacts.listContacts();
        return res.json({ status: 'success', code: 200, data: { contactsList } })
    } catch (e) {
        next(e);
    };
};

const getContactById = async (req, res, next) => {
    try {
      const contact = await Contacts.getContactById(req.params.contactId);
      if (contact) {
        return res.json({ status: 'success', code: 200, data: { contact } })
      };
      return res.json({ status: 'error', code: 404, message: 'Not found' })
    } catch (e) {
      next(e)
    };
};

const addContact = async (req, res, next) => {
    try {
      const contact = await Contacts.addContact(req.body);
      console.log("hello from controllers");
      console.log(contact);
      return res
        .status(201)
        .json({ status: 'success', code: 201, data: { contact } })
    } catch (e) {
      if(e.name === 'ValidationError'){
        e.status = 400;
      }
      next(e);
    };
};

const removeContact = async (req, res, next) => {
    try {
      const contact = await Contacts.removeContact(req.params.contactId);
      if (contact) {
        return res.json({ status: 'success', code: 200, data: { contact } })
      };
      return res.json({ status: 'error', code: 404, message: 'Not found' })
    } catch (e) {
      next(e)
    };
};

const updateContact = async (req, res, next) => {
    try {
      const contact = await Contacts.updateContact(req.params.contactId, req.body);
      console.log(contact);
      if (contact) {
        return res.json({ status: 'success', code: 200, data: { contact } })
      };
      return res.json({ status: 'error', code: 404, message: 'Not found' })
    } catch (e) {
      next(e)
    };
};

const updateStatusContact = async (req, res, next) => {
   try{
    
    if(!req.body.hasOwnProperty("favorite")){
      return res.json({ status: 'error', code: 400, message: 'missing field favorite' })
    };
    const contact = await Contacts.updateStatusContact(req.params.contactId, req.body);
    if(contact){
      return res.json({status: 'success', code: 200, data: {contact} })
    }
    return res.json({status: 'error', code: 404, message: 'Not found'});
  }catch(e){
    next(e);
  };
};

module.exports = {
    getAllContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact,
};