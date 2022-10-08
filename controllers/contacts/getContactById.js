const { RequestError } = require('../../helpers');
const { isValidObjectId } = require('mongoose');
const { Contact } = require('../../models/contacts');
const getContactById = async (req, res, next) => {
    const { id } = req.params;

    const isValidId = isValidObjectId(id);
    if (!isValidId) {
        throw RequestError(400, `${id} id is not correct`);
    }

    const result = await Contact.findById(id);

    if (!result) {
        throw RequestError(404, 'Not found');
    }
    res.json(result);
};

module.exports = getContactById;
