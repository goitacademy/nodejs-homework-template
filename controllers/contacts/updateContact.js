const contactsOperations = require("../../models/contacts");

const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

const updateContact = async (req, res, next) => {
  try {
        const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;  
    }
    const { contactId } = req.params;
    const result = await contactsOperations.updateContact(contactId, req.body);
    if (!result) {
      const error = new Error(`Product with id ${contactId} not found`);
      error.status = 404;
      throw error;      
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = updateContact;
