const { User } = require('../../../models')
const { Conflict } = require('http-errors')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
  const { name, email, password } = req.body

    const user = await User.findOne({email})

    if(user) {
      throw new Conflict(`User with ${email} already exist`)
    }

    else {
      const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

      await User.create({name, email, password: hashPassword})
        .then(_ => res.status(201).json({
              message: 'contact create', 
              code: 201,
              status: 'success',
              data: {
                user: {
                  email,
                  name
                }
              }
            }))    
        .catch(err => res.status(400).json({ message: err.message, code: 400, status: 'falure' }))
    }
}

module.exports = { register }
