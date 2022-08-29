const { NotFound } = require('http-errors');

const contactsOperations = require('../../models/contacts');

const removeById = async (req, res) => {
    const { id } = req.params;
    const result = await contactsOperations.removeContact(id);
    if (!result) {
        throw new NotFound('Not found');
    }
    res.json({
        status: 'success',
        code: 200,
        message: 'contact deleted',
        data: {
            result,
        },
    });
};

module.exports = removeById;
