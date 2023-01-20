const {Contact} = require("../../models");
const Joi = require('joi');

const updateFavorite = async (req, res) => {
  const {id} = req.params;

  const {favorite} = req.body;

  if(favorite === undefined){
    res.json({
      code: 400,
      message:"missing field favorite",
    })
  } else {
  const result = await Contact.findByIdAndUpdate(id, {favorite}, {new:true});
  const joiShema = Joi.object({
    _id: Joi.required(),
    name : Joi.string().required(),
    email: Joi.string().email().required(),
    phone : Joi.string().min(12).max(14).required(),

    favorite: Joi.bool().valid(false, true).required(),

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
      value
  })} else {
    res.json({
      status: 'success',
      code: 404,
      message: "Not found"
      });
    }
  }
}





module.exports = updateFavorite;