
const { addContact } = require('../../model/contacts')

const addContactCtrl = async (req, res, next) => {
  const { name, email, number } = req.body

  console.log(!(name && email && number))
  try {
    if (!(name && email && number)) {
      return res.status(400).json({ message: 'missing required name field' })
    }
    const data = await addContact(name, email, number)
    res.json({
      status: 'success',
      code: 201,
      data: { data }
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = addContactCtrl
