import validator from 'validator'
import z from 'zod'

export const contactsSchema = z.object({
  phone: z.string().refine(validator.isMobilePhone),
  email: z.string().email(),
  name: z.string(),
})
