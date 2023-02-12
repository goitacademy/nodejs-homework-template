const { Contact, joiSchema } = require("../../models");

const addCont = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "Missing required name field";
      throw error;
    }
    const { _id } = req.user;
    const result = await Contact.create({ ...req.body, owner: _id });
    res.status(201).json({ status: "success", code: 201, data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = addCont;
