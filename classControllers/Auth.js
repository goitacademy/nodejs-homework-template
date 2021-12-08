const { login, register, logout } = require("../services/auth");

class Auth {
  async signup(req, res) {
    const { email, password } = req.body;
    const newUser = await register(email, password);

    return res.json({ status: "succes", code: 201, data: newUser });
  }

  async signin(req, res) {
    const { email, password } = req.body;
    const user = await login(email, password);

    res.json({
      status: "success",
      data: {
        token: user.token,
        email: user.email,
        subscription: user.subscription,
      },
    });
  }

  async signout(req, res) {
    const { id } = req.user;
    await logout(id);

    res.status(204).json({ message: "You are loged out!" });
  }
}

module.exports = Auth;
