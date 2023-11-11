function validContact(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
        return res.status(404).json({ message: "missing field" });
    }

    return next();
    };
}

function validUpdateContact(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
        return res.status(400).json({ message: error.message });
        }

        return next();
    };
}

module.exports = {
    validContact,
    validUpdateContact,
};