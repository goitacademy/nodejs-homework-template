const { NotFound, BadRequest } = require('http-error')
const { joiSchema } = require('../model/contact')
const { Contact } = require('../model/contact')

const getAll = async (req, res, next) => {
  try {
    const contacts = await Contact.find()
    res.json(contacts)
  } catch (error) {
    next(error)
  }
}

const getContactById = async (req, res, next) => {
  const { contactId } = req.params
  try {
    const contact = await Contact.findById(contactId)
    if (!contact) {
      throw new NotFound()
    }
    res.json(contact)
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) {
      error.status = 400
    }
    next(error)
  }
}
const createContact = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (error) {
      error.status = 400
      throw new BadRequest(error.message)
    }
    const newContact = await Contact.create(req.body)
    res.status(201).json(newContact)
  } catch (error) {
    if (
      error.message.includes('validation failed') ||
      error.message.includes('length must be at least')
      //
    ) {
      error.status = 400
    }
    next(error)
  }
}
const updateContactById = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const { contactId } = req.params
    const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    })
    if (!updateContact) {
      throw new NotFound()
    }
    res.json(updateContact)
  } catch (error) {
    if (
      error.message.includes('validation failed') ||
      error.message.includes('length must be at least')
      //
    ) {
      //   throw new NotFound()
      error.status = 400
    }
    next(error)
  }
}
const updateStatusById = async (req, res, next) => {
  const { contactId } = req.params
  const { favorite } = req.body

  try {
    if (!favorite) {
      throw new BadRequest('missing field favorite')
    }
    const updateStatusContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    )
    if (!updateStatusContact) {
      throw new NotFound()
    }
    res.status(200)
    res.json(updateStatusContact)
  } catch (error) {
    next(error)
  }
}

const deleteContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const deleteContact = await Contact.findByIdAndRemove(contactId)

    if (!deleteContact) {
      throw new NotFound()
    }
    res.json({ message: 'contact deleted' })
  } catch (error) {
    next(error)
  }
}
module.exports = {
  getAll,
  getContactById,
  createContact,
  updateContactById,
  updateStatusById,
  deleteContactById,
}
