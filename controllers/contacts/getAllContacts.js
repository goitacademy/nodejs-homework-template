const { contacts: service } = require('../../services')

const getAllContacts = async (req, res, next) => {
    try {
        const result = await service.getAllContacts()
        res.json({
            status: 'success',
            code: 200,
            data: {
                contacts: result
            }
        })
    }
    catch (error) {
        next(error)
    }
}

module.exports = getAllContacts
