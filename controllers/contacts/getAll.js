const {Contact} = require('../../models/contact');

// if you need to return special fields
//  const result = await Contact.find({}, "name email");

// if you need to remove special fields
//  const result = await Contact.find({}, "-createdAt, -updateAt");

const getAll = async (req, res, next) => {
    try {
        const result = await Contact.find({})
        res.json(result)
    } catch (error) {
        next(error)
    }
}

module.exports = getAll;