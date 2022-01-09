import repositoryContacts from '../../repository/contacts.js';
import {httpCode} from '../../lib/constants.js';

export const removeContact = async (req, res, next) =>{
    const {id: userId} = req.user
    const {id} = req.params;
    const contact = await repositoryContacts.removeContact(userId, id)
    if (contact) {
        return res
        .status(httpCode.OK)
        .json({status: 'deleted', data:{contact}});

    }
    res.status(httpCode.NOT_FOUND).json({message: `not found contact id = ${id}`})
};
