const { contact: Contact } = require('../service');

const addContact = async (req, res, next) => {
  const { body } = req;
  try {
    const result = await Contact.add(body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next();
  }
};

module.exports = addContact;
