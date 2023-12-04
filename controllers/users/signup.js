const bcrypt = require('bcrypt');
const User = require('../../models/users');
const { signupSchema } = require('../../validation/validation');
const gravatar = require('gravatar');

const signup = async (req, res) => {
  try {
    // Validar los datos del registro
    const { error } = signupSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Verificar si el correo ya está en uso
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(409).json({ message: 'Email in use' });
    }

    // Hashear la contraseña con bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Obtener la URL del avatar de Gravatar
    const avatarURL = gravatar.url(req.body.email, { s: '250', r: 'x', d: 'retro' }, true);

    // Crear un nuevo usuario con la contraseña cifrada y la URL del avatar
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      avatarURL: avatarURL,
    });

    // Guardar el nuevo usuario en la base de datos
    await newUser.save();

    res.status(201).json({ user: { email: newUser.email, subscription: newUser.subscription, avatarURL } });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = signup;
