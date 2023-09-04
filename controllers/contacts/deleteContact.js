const Contact = require('../../models/contact.js');

const deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { _id: owner } = req.user;
        const contacts = await Contact.find({ owner }, "-createdAt -updatedAt");
        const contact = contacts.filter(contact => contact.id === id);
        if (!contact.length) {
            throw new Error('Contact not found');
        }
        const deletedContact = await Contact.findByIdAndRemove(id);
        if (!deletedContact) {
            throw new Error('Contact not found');
        }
        return res.status(200).json({
            status: "success",
            message: "Contact deleted",
            data: deletedContact
        });
    } catch (error) {
        next(error);
    }
};

module.exports = deleteContact;