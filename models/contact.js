import Joi from "joi";
import { Schema,model } from "mongoose";

const contactSchema = new Schema( {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },{versionKey:false, timeseries:true})


  contactSchema.pre( "findOneAndUpdate" ,function(next){
    this.options.new = true;
    this.options.runValidators = true
    next()
  })

contactSchema.post("save",(err,data,next)=>{
    err.status = 400;
    next()
})

contactSchema.post( "findOneAndUpdate" ,(err,data,next)=>{
    err.status = 400;
    next()
})

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required name field"
}),
  phone: Joi.string().required().messages({
    "any.required": "missing required phone field"
}),
  email: Joi.string().required().messages({
    "any.required": "missing required email field"
}),
favorite: Joi.boolean()
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone:Joi.string(),
  favorite:Joi.boolean()
});

export const contactFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required().messages({
      "any.required": "missing field favorite"
  })

})

const Contact = model("Contact",contactSchema)





export default Contact