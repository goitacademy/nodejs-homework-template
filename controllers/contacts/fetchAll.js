const { listContacts } = require('../../models/contacts');

const fetchAll = async (req, res, next) => {
  try {
    const contacts = await listContacts();

    res.json({
      success: true,
      code: 200,
      data: {
        results: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = fetchAll;
