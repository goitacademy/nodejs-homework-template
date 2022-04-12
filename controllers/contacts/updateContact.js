const {Contact, schemas} = require('../../models/contact');
const createError = require('http-errors');



const updateContact = async (req, res, next) => {
    try {
        const { error } = schemas.add.validate(req.body);
        if (error) {
            throw new createError(400, error.message);
        }
        const { id } = req.params;
        const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
        if (!result) {
            throw new createError(400, 'Not found');
        }
        res.json(result);

    } catch (error) {
        next(error)
    }
};

module.exports = updateContact;
