const Contact = require('../../models/contact');

const listContacts = async (req, res, next) => {
    try {
        const { _id: owner } = req.user;
        let reqQuery = {};
        if (!('favorite' in req.query)) {
            reqQuery = { owner };
        } else {
            const { favorite } = req.query;
            reqQuery = { owner, favorite };
        }
        const { page = 1, limit = 20 } = req.query;
        const skip = (page - 1) * limit;
        const result = await Contact.find(
            reqQuery,
            'name email phone favorite',
            {
                skip,
                limit,
            }
        );

        res.json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = listContacts;
