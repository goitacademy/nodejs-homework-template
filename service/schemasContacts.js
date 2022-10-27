const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSaveErrors } = require("../helpers");

const contact = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 20,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      minlength: 2,
      maxlength: 30,
      unique: true,
      require: [true, "Email is required"],
    },
    phone: {
      type: String,
      minlength: 2,
      maxlength: 20,
      required: [true, "Phone is required"],
      unique: true,
    },
    favorite: { type: Boolean, default: false },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },

  { versionKey: false, timestamps: true }
);
contact.post("save", handleSaveErrors);
const Contact = model("contacts", contact);

const schemas = {
  bodyValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(2).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "ua"] },
        })
        .required(),
      phone: Joi.string().alphanum().min(5).max(20).required(),
      favorite: Joi.boolean(),
    });
    const validateBody = schema.validate(req.body);
    if (validateBody.error) {
      return res.status(400).json({ message: "missing required name field" });
    }
    next();
  },
  favoriteValidation: (req, res, next) => {
    const schema = Joi.object({
      favorite: Joi.boolean().required(),
    });
    const validatePutBody = schema.validate(req.body);
    if (validatePutBody.error) {
      return res.status(400).json({ message: "missing field favorite" });
    }
    next();
  },
};

module.exports = { Contact, schemas };
