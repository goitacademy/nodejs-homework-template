const { NotFound } = require('http-errors');

const { Contact } = require('../../models');

const removeContact = async (req, res, next) => {
    const data = await Contact.findByIdAndRemove(req.params.contactId);
    if (!data) {
        throw new NotFound("Not found");
    }
    res.status(200).json({ message: "contact deleted", data });
};

module.exports = removeContact;