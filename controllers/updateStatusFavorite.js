const contacts = require('../model/contacts.json')
const updateJson = require('./updateJSON')

const updateStatusFavorite = async (req, res, next) => {
  const { contactId } = req.params
  const { favorite = false } = req.body
  
  }
  contacts[index] = { ...req.body, _id: contactId }
  await res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts[index],
    },
  })
  updateJson(contacts)
}

module.exports = updateStatusFavorite
