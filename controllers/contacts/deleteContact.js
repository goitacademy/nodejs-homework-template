const { contacts: service } = require('../../services')
const mongoose = require('mongoose')

const deleteContact = async (req, res, next) => {
    const { id } = req.params
    try {
        const validationContactId = mongoose.isValidObjectId(id)
        if (!validationContactId) {
            return res.status(404).json({
                status: 'error',
                code: 400,
                message: 'Contact id must be a string',
            })
        }
        await service.removeContact(id)
        res.status(204).json({
            status: 'success',
            code: 204,
            data: `Contact with id: ${id} was deleted`
        })
    }
    catch (error) {
        next(error)
    }
}

module.exports = deleteContact
