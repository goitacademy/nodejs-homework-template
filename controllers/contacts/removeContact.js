const { HttpCode } = require("../../src/helpers/constants")
const { ContactsService } = require("../../src/services")
const { ErrorHandler } = require("../../src/helpers/ErrorHandler")

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await ContactsService.removeContact(contactId)
    if (!contact) throw new ErrorHandler(HttpCode.NOT_FOUND, "Not found ")
    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      message: "contact removed",
    })
    return
  } catch (error) {
    next(new ErrorHandler(HttpCode.NOT_FOUND, "Not found", error.message))
  }
}
module.exports = removeContact
