const Contact = require('../model/contact')

const get = async (req, res, next) => {
  try {
    const result = await Contact.find({})
    res.json({
      message: 'success',
      status: 200,
      data: {
        result
      }
    })
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const getById = async (req, res, next) => {
  try {
    const id = req.params.contactId
    const result = await Contact.findById(id)
    res.json({
      message: 'success',
      status: 200,
      data: {
        result
      }
    })
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const create = async (req, res, next) => {
  try {
    const result = await Contact.create(req.body)
    console.log(result)
    res.json({
      message: 'success',
      status: 201,
      data: {
        result
      }
    })
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const remove = async (req, res, next) => {
  try {
    const id = req.params.contactId
    const result = await Contact.findByIdAndRemove(id)

    res.json({
      message: 'success',
      status: 204,
      data: { result }
    })
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const update = async (req, res, next) => {
  try {
    const id = req.params.contactId
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true })

    res.json({
      message: 'success',
      status: 200,
      data: {
        result
      }
    })
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const updateStatus = async (req, res, next) => {
  const id = req.params.contactId

  const { favorite } = req.body
  try {
    const result = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      { new: true }
    )

    if (Object.keys(req.body).length !== 0) {
      res.json({
        message: 'success',
        status: 200,
        data: {
          result
        }
      })
    } else {
      res.json({
        message: 'missing field favorite',
        status: 400
      })
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}

module.exports = { get, getById, create, remove, update, updateStatus }
