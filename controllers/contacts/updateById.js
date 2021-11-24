const contactsOperations = require('../../model/index');

const updateById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await contactsOperations.updateById(contactId, req.body);
        
        if (!result) {
            const err = new Error(`not found ${contactId}`);
            err.status = 404;
            throw err;
        }
        res.json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = updateById;