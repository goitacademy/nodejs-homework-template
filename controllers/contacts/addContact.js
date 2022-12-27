const { createContact } = require('../../service');
const { addContactSchema } = require('../../utils');

const addContactController = async (req, res, next) => {
  const { error } = await addContactSchema.validate(req.body);
  if (error) {
    console.log(error);
    res.status(400).json({
      message: 'missing or incorrect fields',
    });
    return;
  }
  const data = await createContact(req.body);
  res.status(201).json(data);
};

module.exports = addContactController;
