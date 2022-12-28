const Contact = require("../../models/contacts");
// 
const addContact = async (req, res, next) => {
    const { _id } = req.user;

    console.log(req.body);

    const result = await Contact.create({ ...req.body, owner: _id });

    res.status(201).json(result)

}

module.exports = addContact;