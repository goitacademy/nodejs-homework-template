const { RequestError } = require('../../helpers');
const { Contact } = require('../../models/contacts');
const { isValidObjectId } = require('mongoose');
const updateContactById = async (req, res, next) => {
    const { id } = req.params;
    const isValidId = isValidObjectId(id);
    if (!isValidId) {
        throw RequestError(400, `${id} id is not correct`);
    }

    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
        throw RequestError(404, 'Not found');
    }

    res.json(result);
};

module.exports = updateContactById;
