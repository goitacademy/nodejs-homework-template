const {addContact} = require("../models/contacts")

async function postContact(req, res, next) {
    console.log(req.body);
        const { name, email, phone } = req.body;
        const newContact = await addContact(name, email, phone);
        res.status(201).json(newContact);
        res.end();
}

module.exports = postContact










// async () => {
//     console.log(req.body);
//     const { name, email, phone } = req.body;
//     const newContact = await addContact(name, email, phone);
//     res.status(201).json(newContact);
//     res.end();