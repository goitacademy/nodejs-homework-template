// (req, res, next) => {
//     const {error} = schemas.validateSchema.validate(req.body)
//     console.log(error);
//     if(error){
//         next(error)
//     }
//     next()
// }

const validateBody = schema => {
    const func = async(req,res,next) => {
        console.log(schema);
        const {error} = schema.validate(req.body)
        console.log(schema);
        if(error){
            next(error)
        }
        next(error)
    }
    return func;
}

module.exports = validateBody