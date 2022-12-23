const contactsOperation = require('../../models/contacts')
const createError = require('http-errors')


const updateContact = async(req, res, next) => {
    try {
        const {contactId} = req.params;
        const updateContact = await contactsOperation.updateContact(contactId, req.body);
        if(!updateContact){
          throw createError(404, "Not found")
        }
        res.json({
          status: "success",
          code: 200,
          data: {
            result: updateContact
          }
        });
      } catch (error) {
        next(error)
    }
}

module.exports = updateContact;