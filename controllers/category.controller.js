const Category = require("../models/category.model")

async function getCategories (req, res) {
    try {
        const categories = await Category. find(); //asyncrono devuelve una promesa

        res.send({ ok: true, categories })

    } catch (error){
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error del servidor "
        }) 
    }
}

async function postCategory(req,res) {
    //Se va encatgar de crear las categorias
    try {
        //Tenemos que obtener los datos que me mandan de la nueva categoria 
        const category = new Category (req.body);

        const categoryDB = await category.save(); //asyncrono

        return res.status(201).send({
            ok:true,
            category: categoryDB
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error del servidor"
        })
    }
}

module.exports = {
    getCategories,
    postCategory,
}