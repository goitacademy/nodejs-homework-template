const {Schema, model} = require("mongoose");

const contactSchema = Schema(
    {
        name: {
          type: String,
          required: [true, 'Set name for contact'],
        },
        email: {
          type: String,
        },
        phone: {
          type: String,
        },
        favorite: {
          type: Boolean,
          default: false,
        },
      }
) ;

const Contact = model("contact", contactSchema);  // Названи коллекции передавать в модель нужно в единственном числе. Mongoose самостоятельно добавит мн. число и определит коллекцию

module.exports = Contact; 