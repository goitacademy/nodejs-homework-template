
const { Contact } = require("../../models/contacts");

const listContacts = async (req, res) => {
    const reply = await Contact.find({},);
    res.json(reply);
}


module.exports = listContacts;