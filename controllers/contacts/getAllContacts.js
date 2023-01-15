const {Contact} = require("../../Schema/contactSchema");

const getAllContacts = async (req, res,) => {

    const response = await Contact.find();
    res.status(200).json(response);

}

module.exports = getAllContacts;