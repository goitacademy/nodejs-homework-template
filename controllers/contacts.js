
const contacts = require('../models/contacts');
const createHttpError = require('../helpers/HttpError');

const ctrlWrapper = require('../utils/ctrlWrapper');



const getContact =  async (req, res) => {
    const result = await contacts.listContacts();
    res.json(result);
  
};

const getContactId = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw createHttpError(404, 'Not found');
    }
    res.json(result);
 
};
  


const postContact = async (req, res) => {
    
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  
};


const delContact = async (req, res) => {
        const { contactId } = req.params;
        const result = await contacts.removeContact(contactId);

        if (!result) {
            throw createHttpError(404, 'Not found');
        }
        res.json({ message: "contact deleted" })
   
};

const putContact = async (req, res, next) => {
    if (!Object.keys(req.body).length) {
      throw createHttpError(400, 'missing fields');
    }
    
      
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw createHttpError(404, 'Not found');
    }
    res.json(result);
};

module.exports = {
    getContact: ctrlWrapper(getContact),
    getContactId: ctrlWrapper(getContactId),
    postContact: ctrlWrapper(postContact),
    delContact: ctrlWrapper(delContact),
    putContact: ctrlWrapper(putContact),
};