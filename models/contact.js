const {Schema,model}=require("mongoose");
const Joi = require("joi");

const {heandleMongoosError}=require("../helpers")
const contactSchema = new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    phone:{type:String, required:true}
},{versionKey:false,timestamps:true});
// default - дефолтне значення
// enum:[] значення одне із
// match: /\{2}-\{2}-\4$/ щоб записати дату 
contactSchema.post("save",heandleMongoosError);

const contactPush = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  });
  const schemas={contactPush};

const Contact = model("contact", contactSchema);

module.exports={Contact,schemas};