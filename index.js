const server = require('./app');
const mongoose= require('mongoose');

// mongodb+srv://rubertarnez:<password>@eit-64910.w5j3gm1.mongodb.net/



async function dbConnect () {
    try {
// Nos conectamos a la base de datos
        await mongoose.connect("mongodb+srv://rubertarnez:7zfBg2bgsRN5UNDk@eit-64910.w5j3gm1.mongodb.net/ecommerce")

        console.log(`\x1b[35m CONEXION A LA DB CORRECTA!`)
// Ponemos nuestro servidor a escuchar 
        server.listen(3000, () => {
            console.log('\x1b[36m Server is running at port 3000  \x1b[37m')
        })
        

    } catch (error) {
        console.log(error)
    }
}


dbConnect()





// app.get('/', (req, res) => {
//     console.log(`Endpoint llamado`)
//     res.send('Hello World!');
// });


