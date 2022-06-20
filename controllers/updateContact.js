const contacts = require("../models/contacts");
const contactAddSchema = require("../schema/addSchema");
const createError = require("../helpers/createError");

const updateContact = async (req, res) => {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        message: "missing required name field",
      });
    }
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      throw createError(404);
    }
    res.json(result);
};

module.exports = updateContact;
