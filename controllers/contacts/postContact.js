const { addContact } = require('../../model/contacts')

const postContact = async (req, res, next) => {
  const { name, email, phone } = req.body
  try {
    const data = await addContact({ name, email, phone })
    res.json({
      status: 'success',
      code: 201,
      data: {
        result: data
      }
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = { postContact }
