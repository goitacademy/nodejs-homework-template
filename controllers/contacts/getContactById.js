const { NotFound } = require('http-errors')

const contactsOperations = require("../../models/contacts")

//-----------------------------------------------------------------------------
const getContactById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await contactsOperations.getContactById(contactId)

        if (!contact) {
            //! 4 - вариант
            throw new NotFound(`Contact wiht id:'${contactId}' not found`)
            //! 3 - вариант
            // throw createError(404, `Contact wiht id:'${contactId}' not found`)
            //! 2 - вариант
            // const error = new Error(`Contact wiht id:'${contactId}' not found`)
            // error.status = 404
            // throw error
            //! 1 - вариант
            //   res.status(404).json({
            //   status: "error",
            //   code: 404,
            //   message: `Contact wiht id:'${contactId}' not found`
            // })
            // return
        }

        res.status(200).json({
            status: "success",
            code: 200,
            data: {
                result: contact
            }
        })

    } catch (e) {
        next(e)
        // res.status(500).json({ error: e.message })
    }
}

module.exports = getContactById