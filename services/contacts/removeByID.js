const { Contact } = require("../../models/contact");

const removeById = async (id) => await Contact.findByIdAndDelete(id);

module.exports = removeById;
