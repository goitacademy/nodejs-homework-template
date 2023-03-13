const { Contact } = require("../../models")
const newError = require("../../utils/newError")

const patchFavoriteById = async (req, res, next) => {
    const { body: { favorite }, params: { id } } = req
    const result = await Contact.findByIdAndUpdate(id, { favorite }, { new: true })
    if (!result) {
        const message = `Contact whith id:${id} not found`
        newError(404, message)
    }
    res.json({
        status: 'success',
        code: 200,
        data: {
            result
        }
    })
}

module.exports = patchFavoriteById