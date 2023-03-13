const { Contact } = require("../../models")
const newError = require("../../utils/newError")

const updateById = async (req, res, next) => {
    const { body, params: { id } } = req
    const result = await Contact.findByIdAndUpdate(id, body, {new: true})
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

module.exports = updateById