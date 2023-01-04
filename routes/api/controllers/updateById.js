const contact = require("../../../models/contacts");

const validation = require("../../../models/validation");

const updateById = async (req, res, next) => {
  try {
    const validationResult = validation.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({
        message: "missing fields",
      });
    }
    const contacts = await contact.updateContact(req.params.id, req.body);
    if (!contacts) {
      res.status(404).json({
        message: "Not found",
      });
    } else {
      res.status(200).json(contacts);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
