const { Contact } = require('../../model')

const getFavorite = async (req, res, next) => {
  try {
    const favorite = await Contact.find({ owner: req.user._id, favorite: true }).populate('owner', '_id email subscription')
    
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: favorite,
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getFavorite