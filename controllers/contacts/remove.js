const Contact = require('../../models/contact');
const { ctrlWrapper, HttpError } = require('../../helpers');

const remove = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) throw HttpError(404, `Not found contact with id: ${contactId}`);
    res.json({
        message: "Contact deleted",
        result
    })
};

module.exports = {
    remove: ctrlWrapper(remove),
};