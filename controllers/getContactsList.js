const Contact = require("../models/contact")

async function getContactsList(req, res, next) {
    const list = await Contact.find();
    console.log(list);
        res.status(200).json(list);
}

module.exports = getContactsList

