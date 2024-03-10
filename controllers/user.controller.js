const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secret = 'tienda'

// Obtener Usuario
async function getUser(req, res) {

    try {
        const id = req.param.id;

        if (id) {

            const users = await User.findb(id, { password: 0 })

            if (!User.length) {
                return res.status(404).send({
                    ok: false,
                    message: "No se encontraron usuarios"
                })
            }
            //  - Devolvemos todos los usuarios
            return res.send({
                ok: true,
                User,
                message: "Usuario encontrado"
            });


        }
        const users = await User.find ()
        .select({ 
            password: 0,
            __v:0 },);

        // Dovolvemos todos los usuarios
        res.send({
            ok: true,
            users,
            message: "Usuarios encontrados"
        })

    } catch (error) {
        console.log(error);

        res.status(500).send({
            message: "error al obtener usuarios",
            ok: false,
        })
    }
}


// Crear Usuraruio

async function createUser(req, res) {

    try {

        const user = new User(req.body)

        // Encriptar contraseña
        user.password = await bcrypt.hash(user.password, saltRounds)

        // Guardamos el usuario
        const userSaved = await user.save()
        // borramos la contraseña del objeto
        // delete userSaved.password
        userSaved.password = undefined

        res.status(201).send({
            ok: true,
            message: "Usuario creado correctamente",
            user: userSaved
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "No se pudo crear el usuario"
        })
    }
}


// Borrar un Usuario 

async function deleteUser(req, res) {

    try {

        // Comprobar si la persona que desea borrar es un ADMIN_ROLE


        console.log(req.user.role)
        
        // Checkeo si el role del usuario NO ES ADMIN no lo dejo continuar 

        if(req.user.role !== 'ADMIN_ROLE'){
            return res.status(401).send({
                ok: false,
                message: "No tienes permisos para realizar esta acci"
            })
        };

        const id = req.params.idUser

        const userDeleted = await User.findByIdAndDelete(id)

        if(!userDeleted) {
            return res.status(404).send({
                ok: false,
                message: "No se encontro el usuario"
            })
        }

        res.send({
            ok: true,
            message: "Usuario borrado correctamente",
            user: userDeleted
        })

    } catch (error) {
        console.log(error)
        res.send('No se pudo borrar el usuario ')

    }


    res.send('DELETE nuevo usuario')
}


// Actualizar Usuario

async function updateUser(req, res) {
    try {
        if(req.user.role !== 'ADMIN_ROLE') {
            return res.status(403).send({ok:false, message:"No tienes permisos para actualizar usuarios"})
        }

        const id = req.params.id;
        const nuevosValores = req.body;

        const userUpdated = await User.findByIdAndUpdate(id, nuevosValores, { new: true })

        res.send({
            ok: true,
            message: "el usuario fue actualizado correctamente",
            user: userUpdated
        })

    } catch (error) {

        console.log(error);
        res.send({
            ok: false,
            message: "El usuario no se pudo actualizar"
        })

    }

}

async function login(req, res) {

    try {

        // obtenemos del body el email y el password
        const { password, email } = req.body;

        if (!password || !email) {
            return res.status(400).send({
                ok: false,
                message: "Faltan datos"
            })
        }

        const user = await User.findOne({ email: email.toLowerCase() })

        if (!user) {
            return res.status(404).send({
                ok: false,
                message: "Datos incorrectos"
            });
        }

        // Si existe el usuario , comparamos la contraseña

        const verifiedUser = await bcrypt.compare(password, user?.password)
 
        // Si la contraseña no es correcta
        if (!verifiedUser) {
            return res.status(404).send({
                ok: false,
                message: "Datos incorrectos"
            });
        }

        //   Realizar el login y devolver respuesta correcta
        user.password = undefined;

        // Generar un token para el Usuario de tal modo que sus datos originales no sean manipulados 

        const token = jwt.sign({ user }, secret, { expiresIn: '1h'})

        res.send({
            ok: true,
            message: "Login correcto",
            user,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "No se pudo hacer el login"
        })
    }
}

module.exports = {

    getUser,
    createUser,
    deleteUser,
    updateUser,
    login
}