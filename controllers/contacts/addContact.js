const { Contact } = require("../../models/");

async function addContact(req, res) {
    const { _id } = req.user;
    const contact = await Contact.create({...req.body, owner: _id});
    res.status(201).json({
        status: "Success",
        code: 201,
        data: {
            result: contact
        }
    });
}

module.exports = addContact;
