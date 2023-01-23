const {Contact} = require("../../models")
const Joi = require('joi')

const addNew = async (req, res) => {
  const {_id} = req.user;
  const {name, email, phone} = req.body

  if (name && email && phone){
    const result = await Contact.create({...req.body, owner: _id});
    const joiShema = Joi.object({
      _id: Joi.required(),
      name : Joi.string().required(),
      email: Joi.string().email().required(),
      phone : Joi.string().min(12).max(14).required(),
      favorite: Joi.bool(),
      owner : Joi.required(),
      createdAt: Joi.date(),
      updatedAt: Joi.date()
    })

    const {error, value} = joiShema.validate(result.toObject());

    if (error) {
      console.log(error.message)
      const errorMsg = error.message

      res.status(400).json({
        status: 'success',
        code: 400,
        error: errorMsg
      });
    }

    if(!error && value){

      res.status(201).json({
        status: 'success',
        code: 201,
        value 
      });
      
    }

  } else {
    res.status(400).json({
      status:"fail",
      code:400,
      message: "missing required name field",
    })
  }
}

module.exports = addNew;