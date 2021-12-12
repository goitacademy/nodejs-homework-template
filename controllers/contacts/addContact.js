const Contact = require("../../model/contacts");

const addContact = async(req, res) => {
    const { _id } = req.user;
    const add = await Contact.create({...req.body, owner: _id });
    res.status(201).json({
        status: "create",
        code: 201,
        result: add,
    });
};

module.exports = addContact;