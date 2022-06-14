
const get = async (req, res, next) => {
    try {
        const user = req.user;
         res.status(201).json({
      status: 'success',
      code: 201,
      data: {
          user: {
              email: user.email,
             subscription: user.subscription
          }
      },
    });
    } catch (e) {
        next(e);
    }
}

module.exports = {
    get
}