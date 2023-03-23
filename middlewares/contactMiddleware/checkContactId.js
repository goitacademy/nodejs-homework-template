const  { Types } = require('mongoose');
const { AppError, catchAsync } = require('../../utils');
const { Contact } = require('../../models');

const checkContactId = catchAsync (async (req, res, next) => {
    const { id } = req.params;

    const idIsValid = Types.ObjectId.isValid(id);
    if(!idIsValid) return next (new AppError(404, 'Contact does not exist'));

    const contactExists = await Contact.exists({ _id: id });
    if(!contactExists) return next(new AppError(404, 'Contact does not exist'));

    next();
});

module.exports = checkContactId;