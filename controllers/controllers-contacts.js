const { code } = require('../template/http-code-template')
const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../model/index')

const getAll = async (req, res, next) => {
    try {
      const contacts = await listContacts()
      res.status(code.OK).json({
        status: 'success',
        code: code.OK,
        data: { contacts },
      })
    } catch (error) {
      next(error)
    }
  }
  
  const getById = async (req, res, next) => {
    try {
      const contactById = await getContactById(req.params.contactId)
      if (contactById) {
        return res.status(code.OK).json({
          status: 'success',
          code: code.OK,
          data: { contactById },
        })
      } else {
        res.status(code.NOT_FOUND).json({
          status: code.NOT_FOUND,
          massage: 'Not Found Contact',
          data: 'Not Found',
        })
      }
    } catch (error) {
      next(error)
    }
  }

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
}