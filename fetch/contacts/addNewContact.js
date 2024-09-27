const { joiContactSchema } = require("../../validation/contacts");

const Contact = require("../../models/contacts");

const createNew = async (req, res, next) => {
  try {
    const { error } = joiContactSchema.validate(req.body);
    if (error) {
      console.log(error);
      res.json({
        message: "Bad request",
      });
      return;
    }

    const result = await Contact.create({
      ...req.body,
      ownerId: req.user.id,
    });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = createNew;