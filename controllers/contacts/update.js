const Contact = require('../../models/contact');
const { ctrlWrapper, HttpError } = require('../../helpers');

const update = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) throw HttpError(404, `Not found contact with id: ${contactId}`);
    res.json(result);
};

module.exports = {
    update: ctrlWrapper(update),
};