import joi from "joi"
const createSchema = joi.object({
    name: joi.string().min(2).max(30).required(),
    email: joi.string().email().required(),
    phone: joi.string().required(),
})
const updateSchema = joi.object({
    name: joi.string().optional(),
    email: joi.string().email().optional(),
    phone: joi.string().optional(),
}).or('name', 'email', 'phone')


const idSchema = joi.object({ id: joi.string().required() })

export const validateCreate = async (req, res, next) => {
    try {
        const value = await createSchema.validateAsync(req.body)
    }
    catch (err) {
        const [{ type }] = err.details
        if (type === 'object.unknown') {
            return res.status(400).json({ message: `Field ${err.message.replace(/"/g, '')}` })
        }
        return res.status(400).json({ message: `Field ${err.message.replace(/"/g, '')}` })
    }
    next()
}
export const validateUpdate = async (req, res, next) => {
    try {
        const value = await updateSchema.validateAsync(req.body)
    }
    catch (err) {
        const [{ type }] = err.details
        if (type === 'object.unknown') {
            return res.status(400).json({ message: `Field ${err.message.replace(/"/g, '')}` })
        }
        return res.status(400).json({ "message": "missing fields" })
    }
    next()
}

export const validateId = async (req, res, next) => {
    try {
        const value = await idSchema.validateAsync(req.params)
    }
    catch (err) {

        return res.status(400).json({ message: `${err.message.replace(/"/g, '')}` })
    }
    next()
}