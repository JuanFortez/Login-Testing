import { Router } from "express";
import { userModel } from "../models/user.model.js";
import bcrypt from "bcrypt";

// userModel.find()
// userModel.create()

const router = Router();

//APIs - CRUD

//GET - Listar todos
router.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    console.log(users);
    res.send({ result: "success", payload: users });
    // res.status(200).json(users);
  } catch (error) {
    console.error("No se pudo obtener la lista de usuarios", +error);
    res.status(500).send({
      error: "No se pudo obtener usuarios con mongoose",
      message: error,
    });
  }
});

//POST - Crear un nuevo usuario
router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    // Validaciones básicas
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    } 

    // Verificar si el email ya existe
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const newUser = {
      first_name,
      last_name,
      email,
      password: hashedPassword,
    };

    const user = await userModel.create(newUser);

    // Eliminamos la contraseña del objeto de respuesta
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      status: "success",
      message: "Usuario creado exitosamente",
      user: userResponse,
    });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({
      status: "error",
      message: "Error al crear el usuario",
      error: error.message,
    });
  }
});

//PUT - Actualizar un usuario
router.put("/:id", async (req, res) => {
  try {
    const userUpdate = req.body;
    const user = await userModel.updateOne({ _id: req.params.id }, userUpdate);
    console.log(user);
    res.status(202).send({ result: "Success", payload: user });
  } catch (error) {
    console.error("No se pudo actualizar usuario", +error);
    res.status(500).send({
      error: "No se pudo actualizar usuarios con mongoose",
      message: error,
    });
  }
});

//DELETE - Eliminar un usuario
router.delete("/:id", async (req, res) => {
  try {
    const user = await userModel.deleteOne({ _id: req.params.id });
    console.log(user);
    res.send({ result: "Success", message: "Usuario eliminado" });
  } catch (error) {
    console.error("No se pudo eliminar usuario", +error);
    res.status(500).send({
      error: "No se pudo eliminar usuarios con mongoose",
      message: error,
    });
  }
});

//POST - Login de usuario
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar que se proporcionaron email y password
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email y contraseña son requeridos",
      });
    }

    // Buscar usuario por email
    const user = await userModel.findOne({ email });

    // Si no existe el usuario
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Email o contraseña incorrectos",
      });
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "error",
        message: "Email o contraseña incorrectos",
      });
    }

    // Si todo está bien, crear respuesta sin la contraseña
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      status: "success",
      message: "Login exitoso",
      user: userResponse,
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({
      status: "error",
      message: "Error al intentar iniciar sesión",
      error: error.message,
    });
  }
});

//Exportar el router
export default router;
