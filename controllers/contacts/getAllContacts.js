const { Contact } = require("../../models/book");

const { ctrlWrapper } = require("../../decorators");

const getAllContacts = async (req, res) => {
    const result = await Contact.find();
    res.json(result);
};

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),

};