const contactsOperation = require('../../model/db');
const { NotFound } = require('http-errors');

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contactsOperation.getById(id);
        if (!result) {
            throw new NotFound(`contact whits id=${id} not found`)
        }
        res.json({
            status: 'success',
            code: 200,
            data: {
                result
            }
        })
    } catch (error) {
        next(error)
    }
};

module.exports = getById;