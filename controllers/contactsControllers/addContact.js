const contacts = require("../../models/contacts");
// const { HttpError } = require("../../helpers");
// const addShema = require("../../schemas/contacts")

const addContact = async (req, res, next) => {

    // const { error } = addShema.validate(req.body);
    // if (error) {
    //   throw HttpError(400, error.message)
    // }

    const result = await contacts.addContact(req.body);
    res.status(201).json(result)

}

module.exports = addContact;