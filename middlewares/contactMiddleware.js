const { catchAsync } = require("../helpers");
const { contactService } = require("../service");

exports.checkValidId = catchAsync(async (req, res, next) => {
    await contactService.checkContactExistById(req.params.contactId, req.user);
    next()
})