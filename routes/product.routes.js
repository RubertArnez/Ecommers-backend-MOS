const express = require ('express');

// iniciamoas el objeto router para poder definir rutas
const router = express.Router();
const productController = require('../controllers/product.controller');
const   jwtVerify = require ('../middlewares/isAuth')


// Definimos ruta obtener todos los PRODUCTOs GET
router.get('/product/:id?', productController.getProduct);


// Agragamos un nuevo PRODUCTO POST
router.post('/product', productController.createProduct);

// Borrar un PRODUCTO DELETE
// router.delete('/product/:idproduct', jwtVerify, productController.deleteProduct);

// Actualizar un PRODUCTO PUT
// router.put('/product/:id', productController.updateProduct);

// Obtener un PRODUCTO especifico GET

// LOGIN
// router.post('/login', productController.login);



// Exportamos router para poder usar rutas en app.js
module.exports = router;




