const jwt = require('jsonwebtoken');
const { serverConfig } = require('../configs/serverConfig');

const signToken = (id) => jwt.sign({id}, serverConfig.jwtSecret, {
    expiresIn: serverConfig.jwtExpires,
})

const checkToken = (token) => {
    if (!token) throw new Error(401, 'Not authorized');
  
    try {
      const { id } = jwt.verify(token, serverConfig.jwtSecret);
  
      return id;
    } catch (err) {
      throw new Error(401, 'Not authorized');
    }
  };
  

module.exports = {
    signToken,
    checkToken
}
