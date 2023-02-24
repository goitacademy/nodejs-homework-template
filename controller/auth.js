const {User} = require('../service/schemas/users')
const jwt = require('jsonwebtoken');
const process  = require('process');


const auth = async(req, res, next) => {
try{
    const tokenName = 'Bearer';
    const foundToken = req.rawHeaders.find(str => str.includes(tokenName));
    
    if(!foundToken){return res.status(401).json({ message: "Not authorized" })}

    const token = foundToken.split(' ')[1];

    if(!token){return res.status(401).json({ message: "Not authorized" })}

    const tokenData = jwt.verify(token, process.env.SECRET)

    if(!tokenData){return res.status(401).json({ message: "Not authorized" })}

    const user = await User.findById(tokenData.id, '-password')
    req.user = user

    next()

} catch(err){
    res.status(400).json({ message: err.message })
}
}


module.exports = {
    auth
  }