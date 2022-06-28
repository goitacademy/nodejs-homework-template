const { User } = require('../../../models')

const register = async (req, res) => {
  const { name, email, password } = req.body

    await User.create(body)
      .then(data => res.status(201).json({
        body: data,
        message: 'contact create', 
        code: 201,
        status: 'success'
      }))
      .catch(err => res.status(400).json({ message: err.message, code: 400, status: 'falure' }))
}

module.exports = {
  register
}
