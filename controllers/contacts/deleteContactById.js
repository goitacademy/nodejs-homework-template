const { RequestError } = require('../../helpers');
const { isValidObjectId } = require('mongoose');
const { Contact } = require('../../models/contacts');
const deleteContactById = async (req, res, next) => {
    const { id } = req.params;
    const isValidId = isValidObjectId(id);
    if (!isValidId) {
        throw RequestError(400, `${id} id is not correct`);
    }
    const result = await Contact.findByIdAndRemove(id);
    if (!result) {
        throw RequestError(404, 'Not found');
    }
    res.json({ message: `contact deleted` });
};

module.exports = deleteContactById;
