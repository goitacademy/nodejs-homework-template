const checkUserDate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        console.log(schema.validate(req.body));
        if (error) {
            res.status(400).json({
                message: "missing required name field"})
            next(error);
            return
        }
        next();
    }
}

module.exports = {
    checkUserDate
}