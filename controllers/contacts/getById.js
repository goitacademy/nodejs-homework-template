const Contact = require('../../models/contact');
const { ctrlWrapper, HttpError } = require('../../helpers');

const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) throw HttpError(404, `Not found contact with id: ${contactId}`);
    res.json(result)
};

module.exports = {
    getById: ctrlWrapper(getById),
};