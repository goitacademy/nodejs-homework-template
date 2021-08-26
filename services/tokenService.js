const Token = require('../schemas/tokenSchema')
const jwt = require('jsonwebtoken')
// const JWT_ACCESS_SECRET = "jwtsecretstring"
// const JWT_REFRESH_SECRET = 'jwtrefreshstring'
const TOKEN_EXPIRE_IN = '30m';
const REFRESH_TOKEN_EXPIRE_IN = '30d'
require('dotenv').config()

class TokenService {
    constructor() { }

    async generateToken(payload) {
      const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: TOKEN_EXPIRE_IN
      })
      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRE_IN
      })
      return {
        accessToken,
        refreshToken,
      }
    }

  async saveToken(userId, refreshToken) {
    console.log(userId, refreshToken);
    const tokenData = await Token.findOne({ user: userId })
    console.log(tokenData);
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }
    const token = await Token.create({ user: userId, refreshToken })
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await Token.deleteOne({ refreshToken })
    return tokenData
  }

  async findToken(refreshToken) {
    const tokenData = await Token.findOne({ refreshToken })
    return tokenData
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
      return userData
    } catch (e) {
      return null
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
      return userData
    } catch (e) {
      return null
    }
  }
}

module.exports = new TokenService();