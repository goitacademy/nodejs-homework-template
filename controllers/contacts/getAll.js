const {Contact} = require('../../models/contacts')

const getAll = async (req, res, next) => {
    const result = await Contact.find({}, "-createdAt  -updateAt");
    return res.json(result)
}

module.exports = getAll;