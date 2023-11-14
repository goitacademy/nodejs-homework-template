import { Schema } from "mongoose";
import { VALIDATION_DATA } from "../../constants/index.js";
import { setMongooseShapeTrimAll } from "../../helpers/index.js";

const { name, email, subscription } = VALIDATION_DATA;

const shape = {
  name: {
    type: String,
    required: true,
    match: [name.pattern, name.message],
    set: name.normalizer,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: email.validator,
      message: email.message,
    },
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  subscription: {
    type: String,
    match: [subscription.pattern, subscription.message],
    default: subscription.default,
  },
  token: {
    type: String,
    default: null,
  },
};

setMongooseShapeTrimAll(shape);
const options = {
  versionKey: false,
  timestamps: true,
};

export const schema = new Schema(shape, options);
