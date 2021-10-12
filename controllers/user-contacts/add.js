/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
const { UserContact } = require('../../models')

const add = async(req, res) => {
    const newContact = {...req.body, owner: req.user._id }
    const result = await UserContact.create(newContact)
    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
            result
        }
    })
}

module.exports = add