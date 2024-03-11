const multer = require ('multer');

const storage = multer.diskStorage({
    detination: (req, file, cb) => {
        cb(null,'public/images/users')
    },
    filename: (req, file, cb) => {

        cb(null, `${Date.now()}-${file.originalname}`)
    }

})

const uploadMulter = multer({
    storage: storage,
})

const upload = uploadMulter.single("image"); // "image" campo de la request donde viene el archivo 

module.exports = upload;