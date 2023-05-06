const { RequestError } = require('../helpers');
const Contact = require('../models/contact');

const isContactOwner = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    const result = req.user.id == contact.owner;
 if (!result) {
        next( RequestError (404, `${contactId} isn't valid`))
    }
    next()
}

module.exports = isContactOwner;