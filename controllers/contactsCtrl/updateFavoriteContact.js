const{ HttpError, } = require('../../helpers');
const {Contact, favoriteSchema} = require('../../models/contacts');

const updateFavoriteContact = async (req, res) => {
    const { error } = favoriteSchema.validate(req.body);
    if (error) {
        throw HttpError(400, error.message);
    };

    const { contactId } = req.params;

    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    
    if (!result) {
        res.status(404).json({ "message": "Not found" })
    };

    res.status(200).json(result);
}


module.exports = updateFavoriteContact;