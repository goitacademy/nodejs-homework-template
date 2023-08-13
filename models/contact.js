import { Schema, model } from "mongoose";
import { addError, updateError } from "../helpers/hooks-errors.js";

// частина моделі, яка відповідає за Joi-схему
// має бути імпортована в окремий файл:
// import Joi from "joi";

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  }
}, { versionKey: false, timestamps: true });

contactSchema.pre("findOneAndUpdate", updateError);

contactSchema.post("save", addError);

contactSchema.post("findOneAndUpdate", addError);

// частина моделі, яка відповідає за Joi-схему
// має бути імпортована в окремий файл:
// const contactAddSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
//   favorite: Joi.boolean(),
// });

// const updateFavoriteSchema = Joi.object({
//   favorite: Joi.boolean().required(),
// });

// const schemas = {
//   contactAddSchema,
//   updateFavoriteSchema,
// }

const Contact = model("contact", contactSchema);
console.log(Contact);

// export default {
//   Contact,
//   schemas,
// };

export default Contact;