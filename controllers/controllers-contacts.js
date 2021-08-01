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

const create = async (req, res, next) => {
    try {
      const { name, email, phone } = req.body
      if (name && email && phone) {
        const contact = await addContact(req.body)
        res.status(code.CREATED).json({
          status: 'success',
          code: code.CREATED,
          data: { contact },
        })
      } else {
        res.status(code.BAD_REQUEST).json({
          status: code.BAD_REQUEST,
          massage: 'missing required name field',
        })
      }
    } catch (error) {
      next(error)
    }
}

const update = async (req, res, next) => {
    try {
      const updatedContact = await updateContact(req.params.contactId, req.body)
      const contact = await getContactById(req.params.contactId)
      if (contact) {
        return res.status(code.OK).json({
          status: 'success',
          code: code.OK,
          data: { updatedContact },
        })
      } else {
        return next({
          status: code.NOT_FOUND,
          massage: 'missing fields',
          data: 'Not Found',
        })
      }
    } catch (error) {
      next(error)
    }
}

const remove = async (req, res, next) => {
    try {
      const id = req.params.contactId
      const contactList = await listContacts()
      const contact = contactList.filter(({ id }) => id === Number(id))
      if (contact) {
        await removeContact(id)
        return res.status(code.OK).json({
          status: 'success',
          massage: 'contact deleted',
          code: code.OK,
        })
      } else {
        return next({
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