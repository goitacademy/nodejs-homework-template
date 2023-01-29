const validateContact = schema => {
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).json({ message: 'missing required name field' });
        next(result.error);
    }
    next();
};

module.exports = { validateContact };