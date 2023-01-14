const { Contact }  = require('../../models/contact');

const getAll = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;  
    // пагинация
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const result = await Contact.find({ owner}, "-createdAt -updatedAt", { skip, limit: Number(limit) }).populate("owner", "email subscription");     

    res.json(
      {
        status: "success",
        code: 200,
        data: {
          result,
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
};

module.exports = getAll;