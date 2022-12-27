const { HttpError, ctrlWrapper } = require('../helpers')
const service = require('../service')

const get = async (req, res, next) => {
  const results = await service.getAllContacts()
    
  res.json(results)
}

const getById = async (req, res, next) => {
  const { id } = req.params
  const result = await service.getContactById(id)
    
  if (!result) {
    throw HttpError(404, 'Not Found')
  }

  res.json(result)
}

const create = async (req, res) => {
  const {name, email, phone} = req.body
  const result = await service.createContact({name, email, phone})

  res.status(201).json(result)
}

const update = async (req, res, next) => {
  const { id } = req.params
  const { name, email, phone } = req.body
  const result = await service.updateContact(id, {name, email, phone})
  if (!result) {
    throw HttpError(404, 'Not Found')
  }

  res.json(result);
}

const updateStatus = async (req, res, next) => {
  const { id } = req.params
  const { favorite = false } = req.body
  const result = await service.updateContact(id, {favorite})
  if (!result) {
    throw HttpError(404, 'Not Found')
  }

  res.json(result);
}

const remove = async (req, res, next) => {
  const { id } = req.params
  const result = await service.removeContact(id)
  
  if (!result) {
    throw HttpError(404, 'Not Found')
  }

  res.json({
    message: 'Delete success'
  })
}

module.exports = {
  get: ctrlWrapper(get),
  getById: ctrlWrapper(getById),
  create: ctrlWrapper(create),
  update: ctrlWrapper(update),
  updateStatus: ctrlWrapper(updateStatus),
  remove: ctrlWrapper(remove),
}
