const { listContacts, getContactById, addContact, removeContact, updateById } = require('../../model/index')
const { contactSchema } = require('../../contactsSchema/contactSchema')

const getContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts()
    res.json({
      status: 200,
      data: {
        contacts,
      },
    })
  } catch (error) {
    next(error)
  }
}

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await getContactById(contactId)
    if (!contact) {
      const error = new Error(`Contact with id=${contactId} Not found`)
      error.status = 404
      throw error
    }

    res.json({
      status: 200,
      data: {
        contact,
      },
    })
  } catch (error) {
    next(error)
  }
}

const addCont = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      error.status = 400
      throw error
    }
    const contacts = await addContact(req.body)
    res.json({
      status: 201,
      data: {
        contacts,
      }
    })
  } catch (error) {
    next(error)
  }
}

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await removeContact(contactId)
    if (!contact) {
      const error = new Error('Not found')
      error.status = 404
      throw error
    }

    res.json({
      status: 200,
      message: 'contact deleted',
    })
  } catch (error) {
    next(error)
  }
}

const changeContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      error.status = 400
      throw error
    }

    const { contactId } = req.params
    const contact = await updateById(contactId, req.body)
    if (!contact) {
      const error = new Error('missing fields')
      error.status = 404
      throw error
    }
    res.json({
      status: 200,
      data: {
        contact,
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getContacts,
  getById,
  addCont,
  deleteContact,
  changeContact,
}
