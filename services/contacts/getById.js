const { Contact } = require("../../models/contact");

const getByID = async (id) => await Contact.findById(id);

module.exports = getByID;
