const { basedir } = global;
const { Contact, schemas } = require(`${basedir}/models/contact`);
const { createError } = require(`${basedir}/helpers`);

const addContact = async (req, res) => {
    // Preventing lack of necessary data
    const { error } = schemas.add.validate(req.body);
    if (error) {
        throw createError(400, "missing required name field");
    }

    const result = await Contact.create(req.body);
    res.status(201).json(result)
};

module.exports = addContact;