const { Contact } = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const updateFavorite = async (req, res, next) => {
    const { contactId } = req.params;
    const { _id: owner } = req.user;
        const result = await Contact.findOneAndUpdate({_id: contactId, owner}, req.body, {new: true});

        if (!result) {
            throw HttpError(404, "Not found");
        }
        res.json(result);
};

module.exports = updateFavorite;