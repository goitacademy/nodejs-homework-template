const { User } = require('../../../models')
const { Conflict } = require('http-errors')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
  const { name, email, password } = req.body

  const user = await User.findOne({email})

    if(user) {
      res.status(409).json({ message: 'Email in use', code: 409, status: 'falure' })
      throw new Conflict()
    }

    else if(!password || password > 6) {
      res.status(400).json({ message: 'Password must has min 6 symbol' })
    }

    else {
      const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
      await User.create({name, email, password: hashPassword})
        .then(_ => res.status(201).json({
              message: 'contact create', 
              code: 201,
              status: 'success',
              data: {
                user: { email, name }
              }
            }))
        .catch(err => res.status(400).json({ message: err.message, code: 400, status: 'falure' }))  
    }
}

module.exports = register
