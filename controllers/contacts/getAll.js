const { Contacts } = require("../../models/contacts");




const getAll = async (req, res) => {
        const contacts = await Contacts.find({});
    res.json({
        status: "Success",
        code: 200,
        data: {
        result: contacts,
        },
    });
    
}

module.exports = getAll;