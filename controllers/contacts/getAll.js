const getAllContacts = async (req, res, next) => {
  const { limit, skip, query } = req;
  try {
    const result = await Contact.find(query, '', {
      skip,
      limit,
    }).populate('owner', '_id name email subscription');
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
