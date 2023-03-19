const mongoose = require('mongoose');
const Contact = require('../models/contactModel');
const { catchAsync, AppError } = require('../utils');

const checkContactId = catchAsync(async (req, res, next) => {
    // console.log(req.params);
    const id = req.params.contactId;

    const idIsValid = mongoose.Types.ObjectId.isValid(id);
    if (!idIsValid) {
        return next(new AppError(404, `Id ${id} does not valid`));
    };

    const contactExists = await Contact.exists({ _id: id });
    if (!contactExists) {
        return next(new AppError(404, `Contact with id ${id} does not exists`));
    };

    next();
})

module.exports = checkContactId;