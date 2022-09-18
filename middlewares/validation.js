const validation = (schema) => {
    return (req, res, next) => {
        const audit = schema.validate(req.body);
            if (audit.error) {
                return res.status(400).json({ message: "missing required field" });
        };
   
        next();
    };

};

module.exports = validation;