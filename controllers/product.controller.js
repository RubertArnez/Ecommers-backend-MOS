const Product = require("../models/product.model")

async function getProduct(req, res) {
    try {
        const products = await Product.find().
        populate("category", "name")
        .limit()
        .skip()

        return res.status(200).send({
            ok: true,
            products
        });

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
};

async function updateProduct(req, res) {
    try {
        // Obtenemos un Id para saber a quien tenemos que actualizar 
        const id = req.params.id; 
        // Obtenemos los valores nuevos o actualizados 
        const body =req.body;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).send({
                ok: false,
                message: "Producto no encontrado "
            })
        };

        // UPDATEAMOS el producto 
        const updatedProduct = await Product.findByIdAndUpdate(id, body, {
            new: true
        })
        return res.status(200).send({
            ok: true,
            message: "Producto actualizado correctamente ",
            product: updatedProduct
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            message: "Error al actualizar el producto"
        })
    }
}

async function deleteProduct(req,res) {
    try {
        const id = req.params.id;

    const product =await Product.findByIdAndDelete(id);
    
    if (!product) {
        return res.status(404).send({
            ok: false,
            message: "Producto no encontrado"
        })
    }

    return res.status(200).send({
        ok: true,
        message: "Producto eliminado correctamente"
    })

    } 
    catch (error) {
        console.log(error)
        return res.status(500).send({
            ok:false,
            message: "Error al eliminar producto"
        })
    }
}

module.exports = {
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}
