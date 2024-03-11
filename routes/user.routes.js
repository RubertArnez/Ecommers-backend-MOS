const express = require ('express');

// iniciamoas el objeto router para poder definir rutas
const router = express.Router();
const userController = require('../controllers/user.controller');
const   jwtVerify = require ('../middlewares/isAuth');
const isAdmin = require('../middlewares/isAdmin');
const uploadImage = require('../middlewares/uploadUserImage')

// router.get ('/test', userController.helloController)

// Definimos ruta obtener todos los usuarios GET
router.get('/users/:id?', userController.getUser);


// !Agragamos un nuevo usuario POST
router.post('/users', uploadImage, userController.createUser);

// Borrar un usuario DELETE
router.delete('/users/:idUser',[ jwtVerify, isAdmin], userController.deleteUser);

// Actualizar un usuario PUT
router.put('/users/:id', [jwtVerify, uploadImage], userController.updateUser);

// Obtener un usuario especifico GET

// LOGIN
router.post('/login', userController.login);

// Busqueda de usuario
router.get('/users/search/:search', userController.searchUser);

// Exportamos router para poder usar rutas en app.js
module.exports = router;




