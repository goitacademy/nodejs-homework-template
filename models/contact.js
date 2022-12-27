const Joi = require("Joi");
const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const contactShema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
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
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);
contactShema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().min(5).max(12).required(),
  favorite: Joi.boolean(),
});

const updateFavoriteShema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteShema,
};

const Contact = model("contact", contactShema);

/* 
const model = (collectionName, shema) => {
    const obj = {
        collectionName, 
        shema, 
        find( {
            const collection = connect(this.collectionName);
            return collection;
        },
        create(value) {
            const(error) = this.schema(value);
            if(erroe){
                throw Error(error.message)
            }
        })
    }
}
*/

module.exports = { Contact, schemas };
