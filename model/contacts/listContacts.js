const Contact = require('../../schemas/Contact')

const listContacts = async (owner, queries) => {
  try {
    const options = { owner }
    if (Object.keys(queries).includes('favorite')) {
      const { favorite } = queries
      const flag = favorite === 'true'
      options.favorite = flag
    }
    const { page = 1, limit = 3 } = queries
    const skip = (page - 1) * limit
    const total = await Contact.countDocuments({ ...options })
    const result = await Contact.find({ ...options }, '_id name email phone favorite owner', { skip, limit: +limit }).populate('owner', '_id email')
    return {
      total,
      pages: Math.ceil(total / limit),
      result
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = { listContacts }
