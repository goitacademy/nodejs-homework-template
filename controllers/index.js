const Contact = require('../model/contactSchema');
const {HttpError, controllersWrapper} = require('../helpers')


const get = async (req, res) => {
  const result = await Contact.find()
  res.status(200).json({
    status: "success",
    code: 200,
    message: `we find ${result.length} contacts`,
    data: result
  })
  if (!result) {
    throw HttpError(404, "Not found")
  }
}

const getById = async (req, res) => {
  const { id } = req.params
  const result = await Contact.findById(id)
      res.json({
        status: 'success',
        code: 200,
        message: `we find contact with ${id} id`,
        data: result ,
      })
  if (!result) {
        throw HttpError (404, `Not found contact by ${id} id`)
      }
}

const create = async (req, res) => {
  const { name, email, phone, favorite } = req.body
  const result = await Contact.create({ name, email, phone, favorite })
    res.status(201).json({
      status: 'success',
      code: 201,
      message: `contact with ${result.name} name is created`,
      data: result 
    })
  if (!result) {
    throw HttpError (404, `Not created`)
  }
}

const favorite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body)
  res.json(result)

  if (!result) {
    throw HttpError (404, `Not found`)
  }

  }



// const change = async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const result = await Contact.findByIdAndUpdate(id, req.body, { new: true })
//   } catch (e) {
//     console.error(e)
//     next(e)
//   }
// }


module.exports = {
  get: controllersWrapper(get),
  getById: controllersWrapper(getById),
  create: controllersWrapper(create),
  favorite: controllersWrapper(favorite)
}

