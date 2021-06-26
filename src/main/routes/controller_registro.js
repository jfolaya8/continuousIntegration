const express = require('express');
const expres = require('express');
const router = expres.Router();
const path = require('path');

const db = require('../database');
const helpers = require('../public/lib/helpers');

//-----VARIABLES GLOBALES -----//
let alerta , textAlerta = "";


//----------INICIO CREAR USUARIO-------------//
router.post('/createuser', async (req, res)=>{

    //Se crea variable con los datos enviados desde el front formulario registro
    const  {name, lastname, email, password} =  req.body;
    
    if (name.length && lastname.length && email.length && password.length != 0) {
        //Se crea una variable con la consulta a la BD para validar si hay usuario registrado
        const consulta = `SELECT * FROM cliente where correo = '${email}'`

        //Se realiza consulta a la BD
        db.query(consulta, async (err, result) =>{

            //Se valida el resultado de la consulta si es igual a 0
            if (result.length === 0) {
                //Se crea variable con el llamado al procedimiento almacenado y la data del formulario
                var passwordencrypted = await helpers.encryptPassword(password);
                const query = `INSERT INTO cliente (nombres, apellidos, correo, contrasena) VALUES('${name}', '${lastname}', '${email}', '${passwordencrypted}')` 

                //Se realiza el llamado a la BD
                await db.query(query, (err, result) =>{
                    if (err) {
                        //Si existe un error se imprime en consola
                        console.error(err.message);                    
                    } else {
                        //Si se realiza la creación exitosa del usuario se redirecciona a la URL users
                        alerta = "alerta_visible";
                        textAlerta = "¡Haz realizado el registro exitosamente!"
                        res.render('./layouts/registro', {textAlerta, alerta} );
                    }
                });           
            }else{
                //Si result es mayor a 0 el usuario ya existe en la BD
                alerta = "alerta_visible";
                textAlerta = "El correo electrónico ya se encuentra registrado"
                res.render('./layouts/registro', {textAlerta, alerta}); 
            }
        });
    }else{
        //Si result es mayor a 0 el usuario ya existe en la BD
        alerta = "alerta_visible";
        textAlerta = "Todos los campos son obligatorios"
        res.render('./layouts/registro', {textAlerta, alerta});         
    }

});

//----------FIN CREAR USUARIO-------------//


module.exports = router;