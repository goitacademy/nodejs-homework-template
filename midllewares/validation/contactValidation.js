import Joi from 'joi'

const schema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
})
const updatedSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
}).or('name', 'email', 'phone')

const idSchema = Joi.object({ id: Joi.string().required() })

export const addValidation = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body)
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Fields &{error.message.replace(/"/g,'')}` })
  }
  next()
}
export const updateValidation = async (req, res, next) => {
  try {
    const value = await updatedSchema.validateAsync(req.body)
  } catch (error) {
    const [{ type }] = error.details
    if (type === 'object.unknown') {
      return res.status(400).json({ message: error.message })
    }
    return res.status(400).json({ message: 'Fields are missing' })
  }
  next()
}

export const validationId = async (req, res, next) => {
  try {
    const value = await idSchema.validateAsync(req.params)
  } catch (error) {
    return res.status(400).json({ message: `${err.message.replace(/"/g, '')}` })
  }
  next()
}
