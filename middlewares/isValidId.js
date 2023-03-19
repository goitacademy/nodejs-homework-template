const { Types } = require('mongoose');
const Contact = require('../models/contactModel');
const { AppError } = require('../utils');

const isVailidId = async (req, res, next) => {
    const { contactId } = req.params;
    const isCorrectedId = Types.ObjectId.isValid(contactId);

    if (!isCorrectedId) {
        return next(new AppError(404, 'Is not correct id format'));
    }

    const contactExists = await Contact.exists({ _id: contactId });
    if (!contactExists) {
        return next(new AppError(404, 'Is not correct id format'));
    }
    next();
};

module.exports = isVailidId;
