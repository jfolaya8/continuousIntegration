const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const passport = require('passport')

const productos = require('../public/lib/productos.json');
const helpers = require('../public/lib/helpers');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/public/img/products')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}.jpg`)
    }
  })
   
const upload = multer({ storage })

router.post('/addproducto', upload.single('file'), async function (req, res){
    //Se crea variable con los datos enviados desde el frond formulario crear usuario    
    
    const  {nombre, precio, unidades, descripcion, caracteristicas, descuento, file} =  await req.body;   

        //Definimos el query a ejecutar
        let ruta = req.file.path.replace('\\*', ',');        
        const consulta = `INSERT INTO producto (idCategoria, nombreProducto, precioUnitario, unidades, descripcion, caracteristicas, descuento, img) 
        VALUES (1,  '${nombre}', ${parseFloat(precio)}, ${parseInt(unidades)}, '${descripcion}', '${caracteristicas}', ${parseInt(descuento)}, '${ruta}');`
        console.log(consulta);
        
        
        //Se realiza el llamado a la BD
        await db.query(consulta, (err, result) =>{
            if (err) {
                //Si existe un error se imprime en consola
                console.error(err.message);                    
            } else {
                //Si se realiza la creación exitosa del usuario se redirecciona a la URL users
                res.redirect('/admproducto');
            }
        }); 
});


router.get('/getProductos', async (req, res)=>{
  console.log(productos);
     
  res.send(productos);  
});

module.exports = router;