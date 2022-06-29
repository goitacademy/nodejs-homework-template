const { User } = require('../../../models')
const { Unauthorized } = require('http-errors')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  const { email, password } = req.body
    
  try {
    const user = await User.findOne({email})
        
    if(!user || !user.comparePassword(password)) {
      res.status(400).json({ message: 'Email or password is wrong', code: 400, status: 'falure' })
      throw new Unauthorized()
    }
    else {
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h'})

      await User.findByIdAndUpdate(user._id, {token})
      .then(_ => res.status(200).json({ code: 200, status: 'success', data: { token }}))
      } 
  } catch (err) {
      res.status(400).json({ message: err.message, code: 400, status: 'falure' })
  }  
}

module.exports = login
