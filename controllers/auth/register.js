// created by Irina Shushkevych
const { Conflict } = require('http-errors')
const { userSchema } = require('../../models')

const register = async (req, res, next) => {
   const { name, email, password } = req.body

   const result = await userSchema.User.findOne({email})
   if (result){
       return next(Conflict('User is allready exists'))
   }

   const newUser = new userSchema.User({name, email})
   newUser.hashPassword(password)
   newUser.save()
   res.status(201).json({
     status: 'created',
     code: 201,
     data: {
       name: newUser.name,
       email: newUser.email,
       subscription: newUser.subscription
     }
  })
}

module.exports = register