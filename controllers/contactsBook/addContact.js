const {Contact} = require("../../models");
const { ctrlWrapper, HttpError} = require("../../helpers");

const {addSchema} = require("../../models");

const addContact = async (req, res) => {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(404, error.message);
    }
    const result = await  Contact.create(req.body);
    res.status(201).json(result);
};

module.exports = { addContact: ctrlWrapper(addContact)};
