const Product = require("../models/product.model")

async function getProduct(req, res) {
    try {
        const products =await Product.find().populate("category", "name");

        return res.status(200).send({
            ok: true,
            // message: "Productos obtenidos correctamente",
            products
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: "Error al obtener productos "
        })
    }
}

async function createProduct(req, res) {
    try { 
        const product = new Product(req.body);

        const productDB = await product.save();

        return res.status(200).send({
            ok:true,
            message: "Producto creado correctamente",
            product: productDB            
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: "Error al crear el producto"
        })
    }
}

module.exports = {
    getProduct,
    createProduct
}



// const Product = require('../models/product.model'); // Suponiendo que tienes un modelo de producto
// const jwt = require('jsonwebtoken');
// const secret = 'tienda'; // La misma clave secreta que usaste para usuarios

// // Obtener Producto
// async function getProduct(req, res) {
//     try {
//         const id = req.params.id;

//         if (id) {
//             const product = await Product.findById(id);

//             if (!product) {
//                 return res.status(404).send({
//                     ok: false,
//                     message: "Producto no encontrado"
//                 });
//             }

//             return res.send({
//                 ok: true,
//                 product,
//                 message: "Producto encontrado"
//             });
//         }

//         const products = await Product.find();

//         res.send({
//             ok: true,
//             products,
//             message: "Productos encontrados"
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             ok: false,
//             message: "Error al obtener productos"
//         });
//     }
// }

// // Crear Producto
// async function createProduct(req, res) {
//     try {
//         const product = new Product(req.body);

//         const productSaved = await product.save();

//         res.status(201).send({
//             ok: true,
//             message: "Producto creado correctamente",
//             product: productSaved
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             ok: false,
//             message: "No se pudo crear el producto"
//         });
//     }
// }

// // Borrar un Producto
// async function deleteProduct(req, res) {
//     try {
//         const id = req.params.id;

//         const productDeleted = await Product.findByIdAndDelete(id);

//         if (!productDeleted) {
//             return res.status(404).send({
//                 ok: false,
//                 message: "No se encontró el producto"
//             });
//         }

//         res.send({
//             ok: true,
//             message: "Producto borrado correctamente",
//             product: productDeleted
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             ok: false,
//             message: "No se pudo borrar el producto"
//         });
//     }
// }

// // Actualizar Producto
// async function updateProduct(req, res) {
//     try {
//         const id = req.params.id;
//         const nuevosValores = req.body;

//         const productUpdated = await Product.findByIdAndUpdate(id, nuevosValores, { new: true });

//         res.send({
//             ok: true,
//             message: "El producto fue actualizado correctamente",
//             product: productUpdated
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             ok: false,
//             message: "El producto no se pudo actualizar"
//         });
//     }
// }

// module.exports = {
//     getProduct,
//     createProduct,
//     deleteProduct,
//     updateProduct
// };
