const Joi = require('joi');
const Contact = require('../../models/contact.js')

const favoriteSchema = Joi.object({
    favorite: Joi.boolean()
});

const getAll = async (req, res, next) => {
    try {
        const { _id: owner } = req.user;
        const { page = 1, limit = 1, favorite } = req.query;
        const validate = favoriteSchema.validate({ favorite });
        if (validate.error) { return res.status(400).json(validate.error) };
        if (page < 1 || limit < 1) {
            return res.status(400).json({
                status: "failed",
                error: "query params incorrect"
            });
        }

        const contacts = await Contact.find({ owner, favorite }, "-createdAt -updatedAt")
            .limit(limit)
            .skip(((page - 1) * limit));
        const totalContacts = await Contact.countDocuments({ owner });
        const totalPages = totalContacts / limit;
        return res.status(200).json(
            {
                status: "success",
                total_contacts: totalContacts,
                total_pages: totalPages,
                current_page: page,
                limit_per_page: limit,
                data: contacts
            });
    } catch (error) {
        next(error);
    }
};

module.exports = getAll;