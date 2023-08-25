import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.SECRET;
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
    console.log(user);
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

export const loginMiddleware = loginUserFunction => async (req, res, next) => {
  const { body } = req;

  if (!('email' in body) || !('password' in body)) {
    return res.status(400).json('Error! Missing password or email field!');
  }

  try {
    const user = await loginUserFunction(body);

    if (!user) {
      return res.status(400).json(`Error! Email or password is wrong!`);
    }

    const payload = {
      id: user.id,
      username: user.email,
    };

    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    user.token = token;
    await user.save();

    const { email, subscription } = user;

    res.status(200).json({
      status: 'success',
      code: 200,
      token: token,
      user: { email, subscription },
    });
  } catch (err) {
    res.status(500).json(`An error occurred while logging the user! ${err}`);
  }
};
