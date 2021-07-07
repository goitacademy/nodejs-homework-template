const { listContacts } = require('../../model/index')
const { HttpCode } = require('../../helpers/constants')

const getAll = async (req, res, next) => {
  try {
    const contacts = await listContacts()
    res.status(HttpCode.OK).json({
      status: 'succes',
      code: HttpCode.OK,
      data: {
        contacts,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getAll
