const { Shema, model } = require("mongoose");
const Joi = require("Joi");
const handleMongooseError = require("../helpers");

const contactShema = new Shema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
contactShema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().min(5).max(12).required(),
});

const schemas = {
  addSchema,
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
