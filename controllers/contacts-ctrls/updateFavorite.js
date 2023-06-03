const { Contact, schemas } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const updateFavorite = async (req, res) => {
    const { error } = schemas.updateFavoriteSchema.validate(req.body);
    if (error) {
        throw HttpError(400, "missing field favorite");
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
        throw HttpError(404, "Not found");
    }

    res.json(result);
};

module.exports = updateFavorite;