import repositoryContacts from '../../repository/contacts.js';
import {httpCode} from '../../lib/constants.js';

export const addContact = async (req, res, next) =>{
    const newContact = await repositoryContacts.addContact(req.body)
    res
    .status(httpCode.CREATED)
    .json({status: 'succes', code: httpCode.CREATED, data: {contact: newContact}});
};