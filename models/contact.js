import {Schema,model} from 'mongoose';
import Joi from "joi";

const contactSchema = new Schema({
    name:{type:String,required:true,},
    email:{type:String,required:true,},
    phone:{type:Number,required:true,},
    favorite:{type:Boolean,default:false},
},{versionKey:false,timestamps:true});

// middlewar of  mongoose застосовувати для виведення помилки якщо не виконалась схема contactSchema 
// contactSchema.post("save",(error,data,next)=>{
//     error.status=400;
//     next();
// })

export const Contact = model("contact",contactSchema);

const updateFavoriteLineScheme=Joi.object({
favorite:Joi.boolean().required(),
});
 const addScheme = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.number().required(),
    favorite:Joi.boolean(),
  });

export const schems = {addScheme,updateFavoriteLineScheme};