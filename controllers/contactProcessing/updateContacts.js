const { updateContact } = require('../../modules/contacts');

const createError = require('http-errors')


const updateContacts = async(req, res, next) => {
    try {
        const {contactId} = req.params;
        const updateResult = await updateContact(contactId, req.body);
        if(!updateResult){
          throw createError(404, "Not found")
        }
        res.json({
          status: "success",
            code: 200,
          message: "contact updated",
          data: {
            result: updateResult
          }
        });
      } catch (error) {
        next(error)
    }
}

module.exports = updateContacts;