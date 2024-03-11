const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const secret = "tienda";

async function getUser(req, res) {
  try {
    const id = req.params.id;

    if (id) {
      const user = await User.findById(id, { password: 0 });

      if (!user) {
        return res.status(404).send({
          ok: false,
          message: "No se encontró el usuario",
        });
      }

      return res.send({
        ok: true,
        user,
        message: "Usuario encontrado",
      });
    }

    const limit = parseInt(req.query.limit) || 3;
    const page = parseInt(req.query.skip) || 0;

    const [total, users] = await Promise.all([
      User.countDocuments(),
      User.find({})
        .limit(limit)
        .skip(page * limit)
        .collation({ locale: "es" })
        .sort({ name: 1 })
        .select({ password: 0, __v: 0 }),
    ]);

    if (!users.length) {
      return res.status(404).send({
        ok: false,
        message: "No se encontraron usuarios",
      });
    }

    res.send({
      ok: true,
      users,
      message: "Usuarios encontrados",
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      message: "Error al obtener usuarios",
    });
  }
}

async function createUser(req, res) {
  try {
    const user = new User(req.body);

    if (req.file && req.file.filename) {
      user.image = req.file.filename;
    }

    user.password = await bcrypt.hash(user.password, saltRounds);

    const userSaved = await user.save();
    userSaved.password = undefined;

    res.status(201).send({
      ok: true,
      message: "Usuario creado correctamente",
      user: userSaved,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      message: "No se pudo crear el usuario",
    });
  }
}

async function deleteUser(req, res) {
  try {
    if (req.user.role !== "ADMIN_ROLE") {
      return res.status(401).send({
        ok: false,
        message: "No tienes permisos para realizar esta acción",
      });
    }

    const id = req.params.id;

    const userDeleted = await User.findByIdAndDelete(id);

    if (!userDeleted) {
      return res.status(404).send({
        ok: false,
        message: "No se encontró el usuario",
      });
    }

    res.send({
      ok: true,
      message: "Usuario borrado correctamente",
      user: userDeleted,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      message: "No se pudo borrar el usuario",
    });
  }
}

async function updateUser(req, res) {
  try {
    if (req.user.role !== "ADMIN_ROLE") {
      return res.status(403).send({
        ok: false,
        message: "No tienes permisos para actualizar usuarios",
      });
    }

    const id = req.params.id;
    const nuevosValores = req.body;

    const userUpdated = await User.findByIdAndUpdate(id, nuevosValores, {
      new: true,
    });

    res.send({
      ok: true,
      message: "El usuario fue actualizado correctamente",
      user: userUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      message: "El usuario no se pudo actualizar",
    });
  }
}

async function login(req, res) {
  try {
    const { password, email } = req.body;

    if (!password || !email) {
      return res.status(400).send({
        ok: false,
        message: "Faltan datos",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).send({
        ok: false,
        message: "Datos incorrectos",
      });
    }

    const verifiedUser = await bcrypt.compare(password, user.password);

    if (!verifiedUser) {
      return res.status(404).send({
        ok: false,
        message: "Datos incorrectos",
      });
    }

    user.password = undefined;

    const token = jwt.sign({ user }, secret, { expiresIn: "1h" });

    res.send({
      ok: true,
      message: "Login correcto",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      message: "No se pudo hacer el login",
    });
  }
}

async function searchUser(req, res) {
  try {
    const search = new RegExp(req.params.search, "i");

    const users = await User.find({
      $or: [{ name: search }, { email: search }],
    });

    return res.send({
      ok: true,
      message: "Usuarios encontrados",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      message: "No se pudo buscar el usuario",
    });
  }
}

module.exports = {
  getUser,
  createUser,
  deleteUser,
  updateUser,
  login,
  searchUser,
};



