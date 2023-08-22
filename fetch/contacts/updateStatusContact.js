const {
  joiToggleFavouriteContactSchema,
} = require("../../validation/contacts");
const Contact = require("../../models/contacts");

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = joiToggleFavouriteContactSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        message: "Missing field favorite",
      });
      return;
    }

    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!result) {
      res.status(404).json({    
         message: "Not found",
      });
      return;
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;