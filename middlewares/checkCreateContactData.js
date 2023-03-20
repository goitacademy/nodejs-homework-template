const Contact = require("../models/contactModel");
const { catchAsync, createContactValidation, AppError, checkContactValidation } = require("../utils");

const checkCreateContactData = catchAsync(async (req, res, next) => {
    const { error, value } = createContactValidation(req.body);

    if (error) {
        checkContactValidation(req, res);
        return next(new AppError(400,
            error.details.map((item) => item.message)
        ));
    }

    const contactExists = await Contact.exists({ email: value.email });

    if (contactExists) {
        return next(new AppError(409, `User with ${value.email} already exists`))
    };

    // req.body = value;
    next();
});

module.exports = checkCreateContactData;