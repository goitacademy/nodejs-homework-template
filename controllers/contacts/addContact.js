const contactOperations = require("../../model/contacts/");

async function addContact(req, res) {
    const contact = await contactOperations.addContact(req.body);
    res.status(201).json({
        status: "Success",
        code: 201,
        data: {
            result: contact
        }
    });
}

module.exports = addContact;
