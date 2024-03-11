const express = require('express');
const app = express();
const cors = require('cors')

const productRoutes = require("./routes/product.routes")
const userRoutes = require("./routes/user.routes")
const categoryRoutes = require("./routes/category.routes");


// MIddlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(cors());


// Aplicamos o integramos las rutas a nuestro server
app.use(
    userRoutes, 
    categoryRoutes, 
    productRoutes);


module.exports = app;