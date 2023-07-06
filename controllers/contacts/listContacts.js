const {Contact} = require("../../models");
const {ctrlWrapper} = require("../../helpers");

const listContacts = async (_, res) => {
    const result = await Contact.find();
    res.json(result);
}

module.exports = ctrlWrapper(listContacts)
