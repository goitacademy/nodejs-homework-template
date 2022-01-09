import repositoryContacts from '../../repository/contacts.js';
import {httpCode} from '../../lib/constants.js';

export const getContacts = async (req, res, next) =>{
    const {id: userId} = req.user
     const contacts = await repositoryContacts.listContacts(userId, req.query);
    res.status(httpCode.OK).
    json({status: 'succes', code: httpCode.OK, data: {...contacts}});
 };
