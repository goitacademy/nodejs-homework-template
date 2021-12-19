import Joi from "joi";

const createSchema = Joi.object({
    name: Joi.string().max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required()
})

const updateSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional()
}).or('name', 'email', 'phone')

export const validatorCreate = async (req, res, next) => {
    try {
    const value = await createSchema.validateAsync(req.body)
    } catch (err) {
        return res.status(400).json({message: `Missing field ${err.message.replace(/"/g, '')} `})
    }
    next ()
}

export const validatorUpdate = async (req, res, next) => {
    try {
    const value = await createSchema.validateAsync(req.body)
    } catch (err) {
        const [{ type }] = err.details
        if (type === 'object.unknown') {
            return res.status(400).json({message: err.message})
        }
        return res.status(400).json({message: 'Missing fields'})
    }
    next ()
}
