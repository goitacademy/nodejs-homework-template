const { Contact } = require('../models')

const allContacts = async (req, res) => {
  const { _id } = req.user
  const { page = 1, limit = 10 } = req.query
  const skip = (page - 1) * limit
  const result = await Contact.find({ owner: _id }, '', {
    skip,
    limit: Number(limit),
  }).populate('owner', '_id email')

  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  })
}

const getContactById = async (req, res) => {
  const { id } = req.params
  const result = await Contact.findById(id)
  if (!result) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found',
    })
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  })
}

const addContact = async (req, res) => {
  const { _id } = req.user
  const result = await Contact.create({ ...req.body, owner: _id })
  res.status(201).json({
    status: 'success',
    code: 201,
    data: { result },
  })
}

const removeContact = async (req, res) => {
  const { id } = req.params
  const result = await Contact.findByIdAndRemove(id)
  if (!result) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found',
    })
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'Contact deleted',
    data: {
      result,
    },
  })
}

const updateContactById = async (req, res) => {
  const { id } = req.params
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true })
  if (!result) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Missing fields',
    })
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  })
}

const updateStatusContact = async (req, res) => {
  const { id } = req.params
  const { favorite } = req.body
  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  )
  if (!result) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'missing field favorite',
    })
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  })
}

module.exports = {
  allContacts,
  addContact,
  getContactById,
  removeContact,
  updateContactById,
  updateStatusContact,
}
