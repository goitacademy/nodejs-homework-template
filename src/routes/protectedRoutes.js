const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Contact = require("../models/contactsModel");

// Ruta protegida: Obtener todos los contactos del usuario autenticado
router.get("/contacts", authMiddleware, async (req, res) => {
  try {
    // Obtener el ID del usuario autenticado desde req.user
    const userId = req.user._id;

    // Buscar los contactos asociados al usuario por su ID
    const contacts = await Contact.find({ owner: userId });

    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error getting contacts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Ruta protegida: Obtener el perfil del usuario autenticado
router.get("/profile", authMiddleware, (req, res) => {
  // Acceso al usuario autenticado a través de req.user
  res.json({ user: req.user });
});

// Ruta protegida: Actualizar la información del usuario
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, email } = req.body;

    // Validación de campos (puedes ajustar esto según tus necesidades)
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // Actualizar la información del usuario en la base de datos
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true } // Devuelve el usuario actualizado
    );

    res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Ruta protegida: Logout del usuario
router.get("/logout", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;

    // Buscar al usuario por ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Eliminar el token en el usuario actual (puedes ajustar esto según tu modelo de datos)
    user.token = null;
    await user.save();

    res.status(204).send(); // Respuesta exitosa sin contenido
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Ruta protegida: Obtener los datos del usuario actual
router.get("/current", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;

    // Buscar al usuario por ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Devolver los datos del usuario
    res
      .status(200)
      .json({ email: user.email, subscription: user.subscription });
  } catch (error) {
    console.error("Error getting user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Ruta protegida: Obtener todos los contactos con paginación
router.get("/contacts", authMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const startIndex = (page - 1) * limit;

    const totalContacts = await Contact.countDocuments();
    const contacts = await Contact.find().skip(startIndex).limit(limit);

    res.status(200).json({
      page,
      limit,
      totalContacts,
      totalPages: Math.ceil(totalContacts / limit),
      data: contacts,
    });
  } catch (error) {
    console.error("Error getting contacts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Ruta protegida: Obtener los contactos marcados como favoritos
router.get("/contacts", authMiddleware, async (req, res) => {
  try {
    const favorite = req.query.favorite === "true";

    const contacts = await Contact.find({ favorite });

    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error getting favorite contacts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Ruta protegida: Renovar la suscripción del usuario
router.patch("/users", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const { subscription } = req.body;

    // Validación de la suscripción (puedes ajustar esto según tus necesidades)
    const validSubscriptions = ["starter", "pro", "business"];
    if (!validSubscriptions.includes(subscription)) {
      return res.status(400).json({ message: "Invalid subscription" });
    }

    // Actualizar la suscripción del usuario en la base de datos
    await User.findByIdAndUpdate(userId, { subscription });

    res.status(200).json({ message: "Subscription successfully updated" });
  } catch (error) {
    console.error("Error updating subscription:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
