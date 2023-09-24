const { schemaValidateStatus } = require('../service/schemas/contactsValidate');

const validateStatus = (req, res, next) => {
    const { favorite } = req.body;
    const { error } = schemaValidateStatus.validate(req.body);

    if (favorite === undefined) {
        return res.status(400).json({ message: 'Missing field favorite' });
    }
    if (error) {
        return res.status(400).json({ message: 'Invalid favorite field format. "favorite" must be a boolean (true or false)!' });
    }
    next();
};


module.exports = validateStatus;