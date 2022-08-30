const {Contacts} = require("../../models/contacts");

const add = async (req, res) => {
    const newContact = await Contacts.create(req.body);
    res.status(201).json({
        status: "Success",
        code: 201,
        message: "Contact added",
        data: {
        result: newContact,
        },
    });
}

module.exports = add;