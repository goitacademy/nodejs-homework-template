import repositoryContacts from '../../repository/contacts.js';
import {httpCode} from '../../lib/constants.js';

export const getContacts = async (req, res, next) =>{
    console.log('query param = stryng', req.query);
    const contacts = await repositoryContacts.listContacts(req.query);
   res.status(httpCode.OK).
   json({status: 'succes', code: httpCode.OK, data: {...contacts}});
};