const express = require('express');
const expres = require('express');
const router = expres.Router();
const path = require('path');

const database = require('../public/lib/database.json');
const helpers = require('../public/lib/helpers');
var fs = require('fs');
const { json } = require('express');

//-----VARIABLES GLOBALES -----//
let alerta , textAlerta = "";


//----------INICIO CREAR USUARIO-------------//
router.post('/createuser', async(req, res)=>{

    //Se crea variable con los datos enviados desde el front formulario registro
    const  {name, lastname, email, password} =  req.body;
    
    if (name.length && lastname.length && email.length && password.length != 0) {
        //Se crea una variable con la consulta a la BD para validar si hay usuario registrado
        for (i=0; i < database.length; i++){
            if (database[i].email == email){
                result = database[i];
            }else{
                result = null;
            }
        }

        //Se valida el resultado de la consulta si es igual a 0
        if (result === null) {
            dataUser = {};
            var passwordencrypted = await helpers.encryptPassword(password);
            dataUser.name = name;
            dataUser.lastname = lastname;
            dataUser.email = email;
            dataUser.passwordencrypted = passwordencrypted;
            database.push(dataUser);
            fs.writeFile("/home/jean_frank/Documentos/poli/continuousIntegration/src/main/public/lib/database.json", JSON.stringify(database), function(err, result){
                if(err){
                    console.log(err)
                }else{
                    // se realiza la creación exitosa del usuario se redirecciona a la URL users
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

    }else{
        //Si result es mayor a 0 el usuario ya existe en la BD
        alerta = "alerta_visible";
        textAlerta = "Todos los campos son obligatorios"
        res.render('./layouts/registro', {textAlerta, alerta});         
    }

});

//----------FIN CREAR USUARIO-------------//


module.exports = router;