const contacts = require('../../models/contacts');
const createError = require('http-errors');



const getContactById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contacts.getContactById(id);
        if (!result) {
            throw new createError(404, 'Not found');
        }
        res.json(result);
    } catch (error) {
        next(error)
    }
  
};

module.exports = getContactById;
