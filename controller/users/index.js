import repositoryContacts from '../../repository/contacts.js';
import {httpCode} from '../../lib/constants.js';

const agregation = async (req, res, next) =>{
    // console.log('agregation', req.params);
    const {id} = req.params;
    const data = await repositoryContacts.getStatisticContacts(id)
    // console.log('data', data);
    if (data) {
        return res.status(httpCode.OK)
        .json({status: 'success', code: httpCode.OK, data});

    }
    res.status(httpCode.NOT_FOUND)
    .json({message: `not found contact `})
};

export {agregation}