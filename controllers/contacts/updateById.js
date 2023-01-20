const {Contact} = require("../../models");
const Joi = require('joi')

const updateById = async (req, res) => {
  const {id} = req.params;
  const {name, email, phone} = req.body;

  if(!name || !email || !phone){
    res.json({
      code: 404,
      message:"missing fields",
    })
  } else {
  const result = await Contact.findByIdAndUpdate(id, req.body, {new:true});
  const joiShema = Joi.object({
    _id: Joi.required(),
    name : Joi.string().required(),
    email: Joi.string().email().required(),
    phone : Joi.string().min(12).max(14).required(),
    favorite: Joi.bool(),
    createdAt: Joi.date(),
    updatedAt: Joi.date()
  })

  const {error, value} = joiShema.validate(result.toObject());

  if (error) {
    console.log(error.message)
  }

  if (!error && value){
    res.json({
      status: 'success',
      code: 200,
      result
  })} else {
    res.json({
      status: 'success',
      code: 404,
      message: "Not found"
      });
    }
  }
}

module.exports = updateById;