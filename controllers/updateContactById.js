const { dataValidator } = require("../helpers");
const { updateContact } = require("../models/contacts");

const updateContactById = async (req, res, next) => {
  try {
    const { error } = await dataValidator(req.body);

    if (error) {
      res.status(400).json({
        message: "Missing fields",
      });

      return;
    }

    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);


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

module.exports = updateContactById;
