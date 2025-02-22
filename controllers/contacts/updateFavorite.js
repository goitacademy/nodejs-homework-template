const Contact = require('../../models/contact.js')

const updateFavorite =  async (req, res, next) => {
    try {
        const { id } = req.params;
        const { favorite } = req.body;
        if (!favorite) {
            return res.status(404).json({
                message: "Missing field favorite"
            });
        }
        const updatedContact = await Contact.findByIdAndUpdate(id, { favorite }, {
            new: true
        });
        if (updatedContact) {
            return res.status(200).json({
                status: "success",
                message: "Contact updated",
                data: updatedContact
            });
        }
        return res.status(404).json({
            status: "failed",
            message: "Contact not found"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = updateFavorite;