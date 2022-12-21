const contactsOperations = require('../../models/contacts');
const { NotFound } = require('http-errors');

const delContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contactsOperations.removeContact(id);
        if (!result) {
            throw new NotFound(`Product with id=${id} not found`);
        }
        res.json({
            status: 'success',
            code: 200,
            message: 'product deleted',
            result: {
                result
            },
        })
    } catch (error) {
        next(error)
    }
};

module.exports = delContact;