// import { Shema, modal } from "mongoose";

// const contactShema = new Shema({
//     name: String,
//     phone: String,
//     email: String,
// });

// const Contact = model("contact", contactShema);

// export default Contact;

import { Schema, model } from "mongoose";
import { handleSaveError, validateAtUpdate} from "./hooks.js";

const contactSchema = new Schema({
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
}, {versionKey: false, timestamps: true});


contactSchema.pre("findOneAndUpdate", validateAtUpdate );

contactSchema.post("save", handleSaveError );
contactSchema.post("findOneAndUpdate", handleSaveError );

const Contact = model("contact", contactSchema);

export default Contact;