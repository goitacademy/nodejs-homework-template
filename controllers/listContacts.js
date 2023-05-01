const { getContacts } = require("../models/contacts");

const listContacts = async (__, res) => res.json(await getContacts());

module.exports = listContacts;
