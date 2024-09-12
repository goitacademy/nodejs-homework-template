const {Contact} = require("../../models");
const { contactValid } = require("../../helpers/");

const updateById = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({
      message: "misssing fields",
    });
    return;
  }

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
    const updatedContact = await Contact.findByIdAndUpdate(
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
