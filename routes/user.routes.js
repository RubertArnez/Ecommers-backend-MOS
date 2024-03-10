const express = require ('express');

// iniciamoas el objeto router para poder definir rutas
const router = express.Router();
const userController = require('../controllers/user.controller');
const   jwtVerify = require ('../middlewares/isAuth')

// router.get ('/test', userController.helloController)

// Definimos ruta obtener todos los usuarios GET
router.get('/users/:id?', userController.getUser);


// Agragamos un nuevo usuario POST
router.post('/users', userController.createUser);

// Borrar un usuario DELETE
router.delete('/users/:idUser', jwtVerify, userController.deleteUser);

// Actualizar un usuario PUT
router.put('/users/:id', jwtVerify, userController.updateUser);

// Obtener un usuario especifico GET

// LOGIN
router.post('/login', userController.login);



// Exportamos router para poder usar rutas en app.js
module.exports = router;




