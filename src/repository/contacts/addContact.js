const model = require('../../model/contacts')

const addContact = async (userID, body) => {
  try {
    
    const data = await model.create({ ...body, owner: userID })
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
module.exports = addContact