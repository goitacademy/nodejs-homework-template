import repositoryContacts from '../../repository/contacts.js';
import {httpCode} from '../../lib/constants.js';

export const updateStatusContact = async (req, res, next) =>{
    const {id: userId} = req.user;
    const {id} = req.params;
    const body = req.body
    const updataContact = await repositoryContacts.updateStatusFav(userId, id, body)
    if (updataContact) {
        return res.status(httpCode.OK).json({status: 'updated', data: {updataContact}});

    }
    res.status(httpCode.NOT_FOUND).json({message: `not found contact id = ${id}`})
};
