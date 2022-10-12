const { Contact } = require('../../models/contact')
const { RequestError } = require('../../helpers');

const remove = async (req, res, next) => {

    const { contactId } = req.params;
    const contact = await Contact.findByIdAndRemove(contactId);
    if (!contact) {
        throw RequestError(404, 'Not found');
    }
    res.json({
        message: 'Contact removed successfully!'
    });
}

module.exports = remove;