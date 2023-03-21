const {Contact} = require('../../models');

const addContact = async (req, res, next) => {
    try {
        const result = await Contact.create(req.body);

        res.status(201).json(
            result
        );
    } catch (error) {
        next(error);
    }
}

module.exports =addContact;