const operations = require('../../models/operations');

const getAllContacts = async (req, res, next) => {
  const { limit, skip, query } = req;
  console.log(query);
  try {
<<<<<<< Updated upstream
    const result = await operations.getAll();
=======
    const result = await Contact.find(query, '', {
      skip,
      limit,
    }).populate('owner', '_id name email subscription');
>>>>>>> Stashed changes
    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
