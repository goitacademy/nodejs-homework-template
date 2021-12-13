
const {    updateById  } = require("../../model/contacts/index");
 
const Joi =require("joi");
const contactSchema = Joi.object({
  name: Joi.string().min(1).max(35).required(),
  email: Joi.string().min(1).max(50).required(),
  phone: Joi.number().required()
  })

const updateContact = async (req, res, next) => {
    try { 
      const {error} = contactSchema.validate(req.body)
      if(error) {
        error.status = 400;
        throw error
      }
      const {contactId} = req.params;
      const result = await updateById(contactId, req.body)
      if (!result) {
        const error = new Error (`Not found`)
        error.status = 404;
        throw error;
      }
      res.json({
        status: "success",
        code: 200,
        data: {
          result
        }
      })
     
     } catch (error) {
          next(error)
     }
  }

  module.exports = updateContact