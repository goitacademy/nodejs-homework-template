const validation = (schema,text) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            error.status = 400;
            error.message = text;
        //    return res.status(400).json({"message": "missing required name field" });
            next(error);
            
        }
        next()
    }
}

module.exports =validation