const UserModel = require("../models/user");
const bcrypt = require("bcrypt")
class UserService {
  constructor() {
    this.model = UserModel;
  }

  findUser = async (req, option) => {
    const user = await this.model.findOne({ [option]: req });
    return user || null;
  };

  createUser = async (body) => {
    const password = await bcrypt.hash(body.password, 10)
    const createUser = await this.model.create({
      ...body,
      password
    })
    return createUser || null
  }


  loginUser = async () => {}
}

module.exports = new UserService();
