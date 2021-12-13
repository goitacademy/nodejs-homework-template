const Joi =require("joi");

const {
    addContact,
  } = require("../../model/contacts/index");

  const contactSchema = Joi.object({
    name: Joi.string().min(1).max(35).required(),
    email: Joi.string().min(1).max(50).required(),
    phone: Joi.number().required()
  })


const addNewContact = async (req, res, next) => {
    try {
      const {error} = contactSchema.validate(req.body)
   
      if(error) {
        error.status = 400;
        throw error
      }
     const result = await addContact(req.body)
   
     res.json({  
     status: "success",
     code: 201,
     data: {
       result
     }
   })
      
    } catch (error) {
      next(error)
    }
   }

   module.exports = addNewContact