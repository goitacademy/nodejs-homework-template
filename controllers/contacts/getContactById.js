const { NotFound } = require('http-errors');
const { Contact } = require('../../models');

const getContactById = async (req, res, next) => {
    const data = await Contact.find({
        _id: req.params.contactId,
        owner: req.user.id,
    });
    if (!data) {
        throw new NotFound("Not found");
    }
    res.status(200).json({ data });
};

module.exports = getContactById;