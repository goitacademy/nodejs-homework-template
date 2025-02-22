const Contact = require('../../models/contact.js')

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { _id: owner } = req.user;
        const contacts = await Contact.find({ owner }, "-createdAt -updatedAt");
        const contact = contacts && contacts.filter(contact => contact.id === id);
        if (!contact.length) {
            throw new Error('Contact not found');
        }
        return res.status(200).json(
            {
                status: "success",
                data: contact,
            });
    } catch (error) {
        res.status(400).json({
            status: "error",
            data: {
                message: error.message,
            }
        });
    }
};

module.exports = getById;