// created by Irina Shushkevych
const { NotFound, BadRequest } = require('http-errors')
const { userSchema } = require("../../models")

const updateUser = async (req, res, next) => {
   const { id } = req.params
   try{
     const user = await userSchema.User.findById(id)
    
     if (!user){
        return next(NotFound(`User with id = ${id} not found`))
     }
     user.updateSubscription(req.body.subscription)
     await user.save()
     res.status(200).json({
       status:'ok',
       code: 200,
       data: user
     })
   } catch(error){
       next(BadRequest(error.message))
   }
}

module.exports = updateUser