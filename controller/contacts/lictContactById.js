import repositoryContacts from '../../repository/contacts.js';
import {httpCode} from '../../lib/constants.js';

export const getContactById = async (req, res, next) =>{
    const {id: userId} = req.user
    const {id} = req.params;
    const contact = await repositoryContacts.getcontactById(userId, id)
    if (contact) {
        return res.status(httpCode.OK)
         .json({status: 'succes', code: httpCode.OK, data: {contact}});
    }
    res.status(httpCode.NOT_FOUND).
    json({status: 'error',message: `not found contact id = ${id}`})
};