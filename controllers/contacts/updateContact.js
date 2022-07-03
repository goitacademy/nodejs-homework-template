const { NotFound } = require('http-errors');
const { Contact } = require('../../models');

const updateContact = async (req, res, next) => {
        const data = await Contact.findByIdAndUpdate(
            req.params.contactId,
            req.body,
            { new: true }
        );
        if (!data) {
            throw new NotFound("Not found");
        }
         res.status(200).json(data);
};

module.exports = updateContact;