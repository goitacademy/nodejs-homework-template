const { dataValidator } = require("../helpers");
const { addContact } = require("../models/contacts");

const add = async (req, res, next) => {
  try {
    const { error } = await dataValidator(req.body);

    if (error) {
      const err = error.details[0].path[0];

      res.status(400).json({
        message: `Missing required '${err}' field`,
      });

      return;
    }

    const result = await addContact(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = add;
