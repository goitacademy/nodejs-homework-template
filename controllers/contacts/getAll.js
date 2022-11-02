const {Contact} = require('../../models/contact')


const getAll = async (req, res, next) => {
  const { _id: owner } = req.user
  const { page = 1, limit = 20, ...filter  } = req.query
  const skip = (page - 1) * limit
  



  try {
    const result = await Contact.find(
      { owner, ...filter },
      '_id name email phone favorite',
      { skip, limit: +limit },
    )
      .populate(
      'owner',
      'email subscription'
    )
    res.json(result)
  } catch (error) { 
    next(error)
  }
}

module.exports = getAll