const Contact = require("../models/contact")

async function postContact(req, res, next) {
    console.log(req.body);
        const newContact = await Contact.create(req.body)
        res.status(201).json(newContact);
        res.end();
}

module.exports = postContact










