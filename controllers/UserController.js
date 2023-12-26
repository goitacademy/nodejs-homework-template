const HTTPError = require("../helpers/HTTPError.js");
const HTTPResponse = require("../helpers/HTTPResponse.js");
const UserService = require("../services/UserService.js");

class UserController {
  constructor() {
    this.service = UserService;
  }

  createUser = async ({ body }, res) => {
    const user = await this.service.findUser(body.email, "email");
    if (user) {
      HTTPError(409, "Email in use");
    }

    const createdUser = await this.service.createUser(body);

    if (!createdUser) {
      HTTPError(500);
    }

    HTTPResponse(res, 201, {
      email: createdUser.email,
      subscription: createdUser.subscription,
    });
  };
}

module.exports = new UserController();
