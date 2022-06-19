async function currentUser(req, res, next) {
  try {
    const { name, email, subscription } = req.user;
    res.json({
      status: 'success',
      code: 200,
      data: {
        user: {
          name,
          email,
          subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}
module.exports = currentUser;
