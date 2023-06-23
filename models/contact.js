const { model } = require("mongoose");

const { handleMongooseError } = require("../middlewares");

const { contactSchema } = require("../schemas");

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = Contact;
