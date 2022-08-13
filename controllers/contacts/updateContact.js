const asyncHandler = require("express-async-handler");
const operations = require("../../service/contacts");
const contasctsSchema = require('./shema')

const updateContact =  asyncHandler(async (req, res, next) => {
    const { error } = contasctsSchema.validate(req.body)
    if (error) {
        const missed = error.message
            .slice(0, error.message.indexOf(' '))
            .slice(0, -1)
            .slice(1)

        error.message = `missing required ${missed} field`
        error.status = 400
        throw error
    }

    const { contactId } = req.params

    const result = await operations.updateContact(contactId, req.body)

    res.json({
        status: 'success',
        code: 200,
        data: {
            result,
        },
    })
})

module.exports= updateContact
