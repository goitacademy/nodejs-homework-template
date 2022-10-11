const { Contact } = require('../models/contact')

const getAll = async (req, res, next) => {
    const contacts = await Contact.find({});
    res.json(contacts);
    console.log('req:', req.body);
}

module.exports = getAll;