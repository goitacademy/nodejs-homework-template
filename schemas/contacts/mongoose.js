import { Schema } from "mongoose";
import { VALIDATION_DATA } from "../../constants/index.js";
import { setMongooseShapeTrimAll } from "../../helpers/index.js";

const { name, phone, email } = VALIDATION_DATA;

const shape = {
  name: {
    type: String,
    required: true,
    match: [name.pattern, name.message],
    set: name.normalizer,
  },
  phone: {
    type: String,
    required: true,
    match: [phone.pattern, phone.message],
    set: phone.normalizer,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: email.validator,
      message: email.message,
    },
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
};

setMongooseShapeTrimAll(shape);

const options = {
  versionKey: false,
  timestamps: true,
};

export const schema = new Schema(shape, options);
