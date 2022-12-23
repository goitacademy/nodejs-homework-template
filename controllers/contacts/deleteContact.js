const contactsOperation = require('../../models/contacts');
const createError = require('http-errors')


const deleteContact = async(req, res, next) => {
    try {
        const {contactId} = req.params;
        const removedContact = await contactsOperation.removeContact(contactId);
        if(!removedContact){
          throw createError(404, "Not found")
        }
        res.json({
          status: "success",
          code: 200,
          message: "contact deleted",
          data: {
            result: removedContact
          }
        });
      } catch (error) {
        next(error)
    }
}


module.exports = deleteContact;