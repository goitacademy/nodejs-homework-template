const Contact = require("../../models/contacts");

const getAll = async (req, res) => {
    console.log(Contact);
    const contacts = await Contact.find();
    res.json({
        status: "success",
        code: 200,
        data: {
            result: contacts
        }
    });
};

module.exports = getAll;