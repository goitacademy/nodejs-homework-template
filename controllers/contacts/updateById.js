const contactsOperations = require('../../model')
const { contactSchema } = require('../../schemas')


const updateById = async (req, res, next) => {
    try {
        const { error } = contactSchema.validate(req.body);
        if (error) {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: error.message,
            })
            return
        }
        const { contactId } = req.params;
        const result = await contactsOperations.updateContactById(contactId, req.body);
        if (!result) {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: `Conatct with ID=${contactId} not found`,
            })
            return
        }
        res.json({
            status: "success",
            code: 200,
            data: {
                result
            }
        })
    } catch (error) {
        next(error)
    }
};


module.exports = updateById;