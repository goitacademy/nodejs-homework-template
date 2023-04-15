import {Schema,model} from 'mongoose';
import Joi from "joi";

const contactSchema = new Schema({
    name:{type:String,required:true,},
    email:{type:String,required:true,},
    phone:{type:Number,required:true,},
    favorite:{type:Boolean,default:false},
},{versionKey:false,timestamps:true});

export const Contact = model("contact",contactSchema);

export const addScheme = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.number().required(),
    favorite:Joi.boolean(),
  });
//   створюємо обєкт з схемами і експортуємо
// const schems = {addScheme,...інші схеми}