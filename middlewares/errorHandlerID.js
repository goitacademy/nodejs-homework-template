const mongoose = require('mongoose');

const validateContactId = (req, res, next) => {
    const { contactId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
        return res.status(400).json({
            status: 'error',
            code: 400,
            message: 'Invalid contactId format',
        });
    }
    next();
};


module.exports = validateContactId;