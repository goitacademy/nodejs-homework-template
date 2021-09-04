const { Schema, Types, model } = require("mongoose");
const Joi = require("joi");

const orderSchema = Schema(
  {
    product: {
      type: String,
      required: true,
    },
    owner: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timesstamps: true }
);

const joiSchema = Joi.object({
  product: Joi.string().required(),
});

const Order = model("order", orderSchema);

module.exports = { Order, joiSchema };
