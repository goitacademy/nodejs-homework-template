// created by Irina Shushkevych
const { Unauthorized } = require('http-errors')
const { userSchema } = require("../../models")

const getCurrent = async (req, res, next) => {
  const { id } = req.user
  const data = await userSchema.User.findById(id)
  if (!data){
      return next(Unauthorized())
  } 
  res.status(200).json({
      status:'ok',
      code: 200,
      data:{
          name: data.name,
          email: data.email,
          subscription: data.subscription
      }
  })
}

module.exports = getCurrent