const { HttpCode } = require("../../src/helpers/constants")
const { ContactsService } = require("../../src/services")

const listContacts = async (_, res, next) => {
  try {
    const contacts = await ContactsService.listContacts()
    res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { contacts } })
  } catch (error) {
    next(error)
  }
}

module.exports = listContacts
