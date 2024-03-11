const express = require ('express');

// iniciamoas el objeto router para poder definir rutas
const router = express.Router();
const productController = require('../controllers/product.controller');
const   jwtVerify = require ('../middlewares/isAuth');
const isAdmin = require('../middlewares/isAdmin');


// Definimos ruta obtener todos los PRODUCTOs GET
router.get('/product/:id?', productController.getProduct);


// Agragamos un nuevo PRODUCTO POST
router.post('/product', productController.createProduct);

// Borrar un PRODUCTO DELETE
router.delete('/product/:id', [jwtVerify, isAdmin], productController.deleteProduct);

// Actualizar un PRODUCTO PUT
router.put('/product/:id', productController.updateProduct);



// Exportamos router para poder usar rutas en app.js
module.exports = router;




