const { getContactById } = require('../../modules/contacts');
const createError = require('http-errors');
// console.log(createError)

const getOneContact = async (req, res, next) => {

    try {
        const { contactId } = req.params;
        const oneContact = await getContactById(contactId);

        if (!oneContact) {
            throw createError(404, `Contact with id=${contactId} not found`)
        }
    
        res.json({
          status: "success",
          code: 200,
          data: {
           result: oneContact,
          }
        });

    } catch (error) {
        next(error)
    }
};

module.exports = getOneContact;