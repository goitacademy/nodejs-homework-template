const { contact } = require('../../models');

const getAll = async (req, res, next) => {
    const result = await contact.find();
    res.json(result);
}
module.exports = getAll;