const { Contact } = require("../../models");


//-----------------------------------------------------------------------------
const getAllContacts = async (req, res, next) => {
    const contacts = await Contact.find({});

    res.status(200).json({
        status: "success",
        code: 200,
        data: { contacts }
    });
};

module.exports = getAllContacts;
