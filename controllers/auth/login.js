// created by Irina Shushkevych
const { NotFound, Unauthorized } = require('http-errors')
const {userSchema} = require('../../models')

const login = async (req, res, next) => {
   const { email, password } = req.body
   const data = await userSchema.User.findOne({email})
   if (!data){
       return next(NotFound())
   }
   const verified = data.comparePassword(password)
   if (!verified){
       return next(Unauthorized())
   }
   data.setToken()
   data.save()
   
   res.status(200).json({
       status: "ok",
       code: 200,
       data: {
           token: data.token,
           user: {
             name: data.name,
             email: data.email,
             subscription: data.subscription
           }
       }
   })
}

module.exports = login