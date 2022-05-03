const { createError } = require("../../helpers");
const { Contact, schemas } = require("../../models/contact");

const patchFavoriteById = async (req, res) => {

    const { error } = schemas.updateStatusContact.validate(req.body);
    if (error) {
        throw createError(400, "missing fields");
    }
    const { contactId } = req.params;
    const result = await Contact.findOneAndUpdate(contactId, req.body, { new: true });
    if (!result) {
        throw createError(404)
    }
    res.json(result);

};

module.exports = patchFavoriteById;