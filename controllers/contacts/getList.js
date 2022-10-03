const Contact = require('../../models/contact');

const getList = async (_, res) => {
    const result = await Contact.find({}, "-createdAt -updatedAt");
    res.json(result);
};

module.exports = getList;

