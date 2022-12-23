const contactsOperation = require('../../models/contacts')
const createError = require('http-errors')


const getOneById = async(req, res, next) => {
    try {
        const {contactId} = req.params;
        const contact = await contactsOperation.getContactById(contactId);
        if(!contact) {
          throw createError(404, `Contact with id=${contactId} not found`)
        }
        res.json({
          status: "success",
          code: 200,
          data: {
            result: contact
          }
        });
      } catch (error) {
       next(error);
    }
}

module.exports = getOneById;