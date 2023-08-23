const { joiContactSchema } = require("../../validation/contacts");
const Contact = require("../../models/contacts");

const editById = async (req, res, next) => {
  try {
    const { error } = joiContactSchema.validate(req.body);
    if (error) {
      res.status(400).json({message: "Missing fields"});
      return;
    }

    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!result) {
      res.json({
        message: "Not found"
      });
      return;
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = editById;