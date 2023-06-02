const bcrypt = require('bcrypt');
const { User } = require('./utils');
const jwt = require('jsonwebtoken');



async function register(req, res, next) {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: 'Email in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            user: {
                email: newUser.email,
                subscription: newUser.subscription,
            },
        });
    } catch (error) {
        next(error);
    }
}

function getCurrentUser(req, res, next) {
    try {
      const { email, subscription } = req.user;
      return res.status(200).json({ email, subscription });
    } catch (error) {
      next(error);
    }
  }
  

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Email or password is wrong' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Email or password is wrong' });
        }

        const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
        user.token = token;
        await user.save();

        return res.status(200).json({
            token,
            user: {
                email: user.email,
                subscription: user.subscription,
            },
        });
    } catch (error) {
        next(error);
    }
}

async function authenticateToken(req, res, next) {
    try {
        const token = req.headers.authorization;
        console.log(token);

        if (!token) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const decodedToken = jwt.verify(token, 'secret');
        const user = await User.findById(decodedToken.userId);

        if (!user || user.token !== token) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized' });
    }
}

async function logout(req, res, next) {
    try {
      const user = req.user;
      user.token = null;
      await user.save();
  
      return res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
  

module.exports = {
    register, login, authenticateToken, logout, getCurrentUser
};
