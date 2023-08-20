const {Contact} = require("../../models");
const { contactValid } = require("../../helpers/");

const add = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({
      massage: "misssing fields",
    });
    return;
  }

  try {
    const { error } = contactValid(req.body);
    if (error) {
      const pathToField = error.details[0].path;
      res.status(400).json({
        message: `missing required ${pathToField} field`,
      });
      return;
    }
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

module.exports = add;
