const { Contact } = require('../../models/contact');

const add = async (req, res, next) => {
  try {
    const newContact = { ...req.body, owner: req.user._id };
    const result = await Contact.create(newContact);
    res.status(201).json({
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = add;
