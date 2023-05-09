const { getContacts } = require("../services/contactsServices");

const listContacts = async (__, res) => res.json(await getContacts());

module.exports = listContacts;
