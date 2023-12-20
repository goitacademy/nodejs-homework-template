const { catchAsync } = require("../helpers");
const { checkContactExistById } = require("../service");

exports.checkValidId = catchAsync(async (req, res, next) => {
    await checkContactExistById(req.params.contactId);
    next()
})