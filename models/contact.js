import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/handleMongooseError.js";
import Joi from "joi";

const contactSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, "Set email for contact"],
        },
        phone: {
            type: String,
            required: [true, "Set phone for contact"],
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
    },
    { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);
contactSchema.pre("findOneAndUpdate", function (next) {
    this.getOptions.runValidators = true;
    next();
});
contactSchema.post("findOneAndUpdate", handleMongooseError);

const Contact = model("contact", contactSchema);

const controlPost = Joi.object({
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
});

const controlPut = Joi.object({
    email: Joi.string(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
});

const controlPatch = Joi.object({
    favorite: Joi.boolean().required(),
});

const schemasJoi = { controlPost, controlPut, controlPatch };
export { Contact, schemasJoi };