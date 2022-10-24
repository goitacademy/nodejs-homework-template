const {Contact} = require('../models/contact')

const getAll = async (req, res, next) => {
    console.log('Works')
    const result = await Contact.find({});
    res.status(200).json(result);
};

module.exports = getAll;
