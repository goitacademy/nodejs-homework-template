const { Contact } = require("../../models/contact");

const getAll = async () => await Contact.find();

module.exports = getAll;
