const validation = (schema) => {
    return(req, res, next) => {
        const {error} = schema.validate(req.body);
        if(error){
            error.status = 400;
            error.message= `missing required ${req.body.name} field`;
            next(error);

        }
            next()
    }
}

module.exports = validation;