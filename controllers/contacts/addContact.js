const {Contact} = require('../../models');

const addContact = async (req, res, next) => {
    const {_id} = req.user;
    try {
        const result = await Contact.create({...req.body, owner: _id});

        res.status(201).json(
            result
        );
    } catch (error) {
        next(error);
    }
}

module.exports =addContact;