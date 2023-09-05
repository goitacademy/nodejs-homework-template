import Joi from 'joi'
import JoiPhoneNumber from 'joi-phone-number'

const myJoi = Joi.extend(JoiPhoneNumber)

const schemaValidation = myJoi.object({
  name: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().required(),
  phone: myJoi.string().phoneNumber().required(),
})

export default schemaValidation