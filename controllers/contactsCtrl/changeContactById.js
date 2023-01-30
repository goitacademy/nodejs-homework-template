const contactsOperations = require('../../models/contacts');

const contactSchema = require('../../schemes/contactSchema');

const changeContactById = async (req, res, next) => {
    try {
        const {error} = contactSchema.validate(req.body);
            if(error) {
                return res.status(400).json({message:"missing fields"})
            }

        const {contactId} = req.params;
        const contact = await contactsOperations.updateContact(contactId, req.body);
    if (!contact) {
        const error =  new Error(`Contact with id=${id} not found`);
        error.status = 404;
        throw error;
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

module.exports = changeContactById;