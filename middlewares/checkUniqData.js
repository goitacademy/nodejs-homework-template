const { Contact } = require("../models");
const { RequestError } = require("../helpers");

const checkUniqData = async (req, _, next) => {
    const body = req.body;
    const { contactId } = req.params;
    const { id: userId } = req.user;
    console.log(contactId);

    const contactWithEmail = await Contact.findOne({ email: body.email, owner: userId });

    if (contactWithEmail && contactWithEmail?.id !== contactId) {
        next(RequestError(409, "Email is already exist"));
        return;
    }

    const contactWithPhone = await Contact.findOne({ phone: body.phone, owner: userId });
    if (contactWithPhone && contactWithPhone?.id !== contactId) {
        next(RequestError(409, "Phone number is already exist"));
        return;
    }

    next();
};

module.exports = checkUniqData;
