const { model } = require("mongoose");

const { mongooseContactSchema } = require("../validation/contacts");

const { handleSchemaValidationError } = require("../helpers");

mongooseContactSchema.post("save", handleSchemaValidationError);

const Contact = model("contact", mongooseContactSchema);

module.exports = Contact;