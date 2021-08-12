const { HttpCode } = require("../../src/helpers/constants")
const { ContactsService } = require("../../src/services")

const addContact = async (req, res, next) => {
  const { body } = req
  try {
    const newContact = await ContactsService.create(body)
    res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: { newContact },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = addContact
