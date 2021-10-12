/* eslint-disable eol-last */
/* eslint-disable indent */
const { UserContact } = require('../../models')

const getAll = async(req, res) => {
    const { _id } = req.user
    const result = await UserContact.find({ owner: _id }).populate('owner', 'email')
    res.json({
        status: 'success',
        code: 200,
        data: {
            result
        }
    })
}

module.exports = getAll