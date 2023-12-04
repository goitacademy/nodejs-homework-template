const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/users');
const { loginSchema } = require('../../validation/validation');


const login = async (req, res) => {
  try {
    // Validar los datos de inicio de sesión
    const { error } = loginSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Buscar el usuario por correo electrónico
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }

    // Comparar la contraseña
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (passwordMatch) {
      // Generar un token JWT y guardarlo en el usuario
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      user.token = token;
      await user.save();
      res.status(200).json({ token, user: { email: user.email, subscription: user.subscription } });
    
    } else {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }
  } catch (error) {
    console.log (error)
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = login;


