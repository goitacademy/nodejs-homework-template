
const user = require('../schemas/userSchema')

class UserRepository {
  constructor() {
    this.model = user
  }
  async addUser(body) {
    const user = new this.model(body)
    return user.save()
  }

  async getById(userId) {
    const data = await this.model.findOne({_id: userId})
    return data
  }  
  async getByEmail(email) {    
    const data = await this.model.findOne({email})
    return data
  } 
  async updateToken(userId, token) {
    await this.model.updateOne({_id: userId}, {token}) 
  }
  async updateSubscription(userID, body) {
    const data = await this.model.findByIdAndUpdate(userID, {...body},{new: true})
    return data
  }
}

module.exports = { UserRepository }