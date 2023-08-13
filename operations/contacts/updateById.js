const contactsOperations = require("../../models/contacts");
const { contactValid } = require("../../helpers/");

const updateById = async (req, res, next) => {
  // if (!req.body) {
  //   console.log("no body");
  //   res.status(400).json({
  //     massage: "misssing fields",
  //   });
  //   return;
  // }

  const { error } = contactValid(req.body);
  
  try {
    
    if (error) {
      const pathToField = error.details[0].path;
      res.status(400).json({
        message: `missing required ${pathToField} field`,
      });
      return;
    }

    const { contactId } = req.params;
    const updatedContact = await contactsOperations.updateContact(
      contactId,
      req.body
    );
    if (!updatedContact) {
      res.status(404).json({
        message: "Not found",
      });
      return;
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
