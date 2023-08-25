export const signupMiddleware = addUserFunction => async (req, res, next) => {
  const { body } = req;

  if (!('email' in body) || !('password' in body)) {
    return res.status(400).json('Error! Missing password or email field!');
  }

  try {
    const user = await addUserFunction(body);
    if (user === 409) {
      return res.status(409).json({ message: 'Email in use' });
    }
    const { email, subscription } = user;
    return res.status(201).json({
      status: 'success',
      code: 201,
      user: { email, subscription },
    });
  } catch (err) {
    res.status(500).json(`An error occurred while adding the user: ${err}`);
  }
};
