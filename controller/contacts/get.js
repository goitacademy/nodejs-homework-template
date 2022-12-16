const service = require('../../services');

const get = async (req, res, next) => {
  const { id } = req.user;
  const { page, limit, favorite } = req.query;
  const skip = parseInt(page) > 1 ? (page - 1) * limit : 0;
  try {
    const contacts = await service.getAllContacts({
      owner: id,
      skip,
      limit,
      favorite,
    });
    return res
      .status(200)
      .json({ data: contacts, amount: contacts.length, page, limit });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = get;
