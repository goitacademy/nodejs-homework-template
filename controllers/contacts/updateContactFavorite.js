const ContactModel = require("../../models/contact")
const { HttpError } = require("../../helpers")

const updateContactFavorite = async (req, res) => {
    const { id } = req.params
    const result = await ContactModel.findByIdAndUpdate(id, req.body, { new: true })

    if (!result) {
        throw(HttpError(404, "Not found"))
    }

    res.json(result)
}

module.exports = updateContactFavorite