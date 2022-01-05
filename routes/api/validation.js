
import joi from 'joi';

const createSchema = joi.object({
    name:joi.string().min(2).max(30).required(),
    email:joi.string().email().required(),
    phone:joi.string().required()
});

const updateSchema =joi.object({
    name:joi.string().min(2).max(30).optional(),
    email:joi.string().email().optional(),
    phone:joi.string().optional()
}).or('name', 'email', 'phone');

const idSchema = joi.object({
    id: joi.string().required(),
})

export const validateCreate = async(req, res, next) =>{
try {
    const value = await createSchema.validateAsync(req.body)
} catch (error) {
     return res.status(400).json({message: `Field ${ error.message.replace(/"/g, '')}`})
}
next();
};

export const validateUpdte = async(req, res, next) =>{
    try {
        const value = await updateSchema.validateAsync(req.body)
    } catch (error) {
        const [{details}] = error.details;
        if (error.type === 'string.min') {
        return res.status(400).json({message: error.message})
        }
         return res.status(400).json({message: `Field ${ error.message.replace(/"/g, '')}`})
    }
    next();
    };

    export const validateId = async(req, res, next) =>{
        try {
            const value = await idSchema.validateAsync(req.params)
        } catch (error) {
         return res.status(400).json({message: `Field ${ error.message.replace(/"/g, '')}`})
        }
        next();
        };