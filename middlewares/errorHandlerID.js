const mongoose = require('mongoose');

const validateContactId = (req, res, next) => {
    const { contactId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
        return res.status(400).json({ message: `Invalid id ${contactId} format` });
    }
    if (contactId === undefined) {
        res.status(404).json({ message: `Not found contact id ${contactId}` });
    }
    next();
};


module.exports = validateContactId;