const { schemaJoi, Contact } = require("../../models/contact");

const add = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { error } = schemaJoi.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
    const result = await Contact.create({ ...req.body, owner: _id });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = add;
