const { Contact } = require('../../models');

const listContacts = async (req, res, next) => {
    const { id } = req.user;
    const { page = 1, limit = 10, favorite = null } = req.query;

    const filter = favorite ? { owner: id, favorite } : { owner: id };
    const skip = (page - 1) * limit;

    const results = await Contact.find(filter, "", {
        skip,
        limit: Number(limit),
    });

    res.status(200).json(results);
};

module.exports = listContacts;