const { Contact } = require("../../models/contact");

const getAllContacts = async (req, res) => {
    const data = await Contact.find({}, "-createdAt -updatedAt");
    res.json(data);
};

module.exports = getAllContacts;