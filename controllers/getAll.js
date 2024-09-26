const operations = require("../models/contacts");

const getAll = async (req, res, next) => {
    try {
        const contacts = await operations.listContacts();
        res.json(contacts);
        console.log('req:', req.body);
    }
    catch (err) {
        next(err);
    }
}

module.exports = getAll;