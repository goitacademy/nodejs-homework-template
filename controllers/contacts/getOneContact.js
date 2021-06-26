const contacts = require('../../data/contacts.json')

const getOneContact = (req, res, next) => {
    const { id } = req.params
    const contact = contacts.find((item) => item.id === Number(id))
    if (!contact) {
        return res.status(404).json({
            status: 'error',
            code: 404,
            message: 'Not found'
        })
    }
    res.json({
        status: 'success',
        code: 200,
        data: {
            result: contact,
        }
    })
}

module.exports = getOneContact;