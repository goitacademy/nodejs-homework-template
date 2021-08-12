const { HttpCode } = require("../../src/helpers/constants")
const { ContactsService } = require("../../src/services")
const { ErrorHandler } = require("../../src/helpers/ErrorHandler")

const getContactById = async (req, res, next) => {
  const { contactId } = req.params
  try {
    const contact = await ContactsService.getContactById(contactId)
    if (!contact) throw new ErrorHandler(HttpCode.NOT_FOUND, "Not found ")
    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { contact: contact },
    })
  } catch (error) {
    next(new ErrorHandler(HttpCode.NOT_FOUND, "Not found", error.message))
  }
}
module.exports = getContactById
