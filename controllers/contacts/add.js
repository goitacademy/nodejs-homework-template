const {Contact, schemas} = require('../../models/contact')
const { RequestError } = require('../../helpers/Errors')



const add = async (req, res, next) => {
  const { _id: owner } = req.user
  
  try {
    const { error } = schemas.addSchema.validate(req.body);
    if (error) {
      throw RequestError(`missing required ${error.message}field`, 400)
    }

    const result = await Contact.create({...req.body, owner})
    res.status(201).json(result)
  }
  catch (error) {
    next(error)
  }
}

module.exports = add