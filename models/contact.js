const { model } = require("mongoose");

const { mongooseContactSchema } = require("../validation/contacts");

const { handleValidationError } = require("../helpers");

mongooseContactSchema.post("save", handleValidationError);

const Contact = model("contact", mongooseContactSchema);

module.exports = Contact;
