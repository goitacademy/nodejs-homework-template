const Contact = require("../models/contact")

async function postContact(req, res, next) {
try {
    const newContact = await Contact.create(req.body)
        res.status(201).json(newContact);
        res.end();
    } catch (error) {
     console.log(error);
    next(error);
    }
}

module.exports = postContact










