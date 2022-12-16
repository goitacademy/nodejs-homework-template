const Contact = require("../../models/contact")

const HttpError = require("../../helpers")

const getById = async (req, res, next) => {
    const { id } = req.params;
    const result = await Contact.getById(id);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result)
}
module.exports = getById