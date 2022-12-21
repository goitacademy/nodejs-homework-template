const contactsOperations = require('../../models/contacts');

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contactsOperations.getContactById(id);
        if (!result) {
            const error = new Error(`Product with id=${id} not found`);
            error.status = 404;
            throw error;
        }
        res.json({
            status: 'success',
            code: 200,
            result: {
                result
            },
        })
    } catch (error) {
        next(error);
    }
};

module.exports = getById;