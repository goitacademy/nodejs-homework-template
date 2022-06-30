const { NotFound, BadRequest } = require('http-errors');
const { Contact } = require('../../models');
const updateStatusContact = async (req, res, next) => {
    const { contactId } = req.params;
    const body = req.body;

    if (typeof body?.favorite !== "boolean") {
        throw new BadRequest("missing field favorite");
    }
    const result = await Contact.findByIdAndUpdate(
        contactId,
        { favorite: body.favorite },
        { new: true }
    );
    if (!result) {
throw new NotFound(` Not found task id: ${contactId}`);
    }
        res.status(200).json({ message: result });
    
};

module.exports = updateStatusContact;