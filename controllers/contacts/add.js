const { Contact, shemas } = require("../../models/contact");
const { createError } = require('../../helpers');

const add = async (req, res, next) => {
    const { error } = shemas.add.validate(req.body);
    if (error) { 
      throw createError(400, error.message);
    }
    const result = await Contact.create(req.body);
    res.json(result);
}

module.exports = add;