// created by Irina Shushkevych
const { contactSchema } = require('../../models')

const listContacts = async (req, res) => {
  const { id } = req.user
  const { page = 1, limit = 10, favorite } = req.query

  let condition = null
  if (favorite){
    condition = {
      $and: [
        { owner: id },
        { favorite }
      ]
    }
  } else {
    condition = { owner: id}
  }

  const allData = await contactSchema.Contact.find(condition)
  const data = await contactSchema.Contact.find(
    condition,
    '',
    {skip: (page - 1) * limit,
    limit: Number(limit)}
  )

  let total = Math.floor(allData.length / limit)
  if (allData.length % limit > 0){
    total += 1
  }
  res.status(200).json({
    status: 'ok',
    code: 200,
    total: allData.length,
    totalPage: total,
    data
  })
}

module.exports = listContacts
