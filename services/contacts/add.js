const { Contact } = require("../../models/contact");

const add = async (body) => await Contact.create({ ...body });

module.exports = add;
