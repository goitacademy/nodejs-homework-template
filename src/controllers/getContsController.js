const service = require("../service/index");

const getConts = async (req, res, next) => {
  try {
    const contacts = await service.getAllcontacts();
    res.json({
      status: 200,
      data: contacts,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
    next(error);
  }
};

module.exports = getConts;
