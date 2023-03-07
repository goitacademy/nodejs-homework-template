const checkUserDate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        const field = error.message.split('"')[1];
        console.log(field);
        const message = `missing required ${field} field`
        if (error) {
            res.status(400).json({
                message,})
            next(error);
            return
        }
        next();
    }
}

module.exports = {
    checkUserDate
}