const { Contact }  = require('../../models/contact');

const getAll = async (req, res) => {
  try {
    const { _id: owner } = req.user;  
    // пагинация
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;
// фильтрация по favorite
    const query = { owner };
    if (typeof favorite !== 'undefined') {
      query.favorite = favorite;
    }
  //  query.favorite = favorite ? favorite : {$in: [true, false]}
    const result = await Contact.find(query, "-createdAt -updatedAt", { skip, limit: Number(limit) }).populate("owner", "email subscription");     

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