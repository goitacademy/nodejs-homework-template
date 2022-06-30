const validation = (schema,text) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            error.status = 400;
            error.message = text;
            next(error);
            
        }
        next()
    }
}

module.exports =validation