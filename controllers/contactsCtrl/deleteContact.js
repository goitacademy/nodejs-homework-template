const contactsOperations = require('../../models/contacts');

const deleteContact = async (req, res, next) => {
    try {
        const {contactId} = req.params;
        const contact = await contactsOperations.removeContact(contactId);
    if (!contact) {
        const error =  new Error(`Not found`);
        error.status = 404;
        throw error;
    }
    res.json({
        status: "success",
        code: 200,
        message: "contact deleted",
        data: {
            result: contact
            }
        });
    } catch (error) {
        next(error);
    }
  }

module.exports = deleteContact;
