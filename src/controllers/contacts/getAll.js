const { getAllContacts } = require("../../models/index");

const getAll = async (req, res) => {
  try {
    const contacts = await getAllContacts();
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: { result: contacts },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Something went wrong'
    });
  }
};

module.exports = getAll;
