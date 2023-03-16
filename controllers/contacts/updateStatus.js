const { updateContact } = require('../../service/contacts')

const { catchAsync } = require('../../utils')


const updateStatus = catchAsync(async (req, res, next) => {
    const { contactId } = req.params
    const { favorite = false } = req.body

    if (favorite.length === 0) {
        res.status(400).json({ message: 'missing field favorite' })
        return
    }

    const data = await updateContact(contactId, { favorite })

    if (data) {
        res.json({
            status: 'success',
            code: 200,
            data,
        })
    } else {
        res.status(404).json({
            status: 'error',
            code: 404,
            message: `Not found contact id: ${contactId}`,
            data: 'Not Found',
        })
    }

});

module.exports = updateStatus