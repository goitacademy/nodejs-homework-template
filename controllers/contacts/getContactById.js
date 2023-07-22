const { catchAsync } = require("../../utils");
const contactService = require("../../services/contactServices");
/**
 * Find contact by id controller
 */
const getContactById = catchAsync(async (req, res) => {
  const contact = await contactService.getContactById(req.params.id);

  res.status(200).json({
    msg: "Success",
    contact,
  });
});

module.exports = getContactById;