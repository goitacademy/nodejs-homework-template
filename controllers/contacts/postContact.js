const Contact = require("../../models/contact")

async function postContact(req, res, next) {
    const {_id: owner} = req.user
try {
    const newContact = await Contact.create({...req.body, owner})
        res.status(201).json(newContact);
        res.end();
    } catch (error) {
     console.log(error);
    next(error);
    }
}

module.exports = postContact










