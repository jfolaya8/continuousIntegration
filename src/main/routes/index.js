const express = require('express');
const router = express.Router();

const passport = require('passport')

const helpers = require('../public/lib/helpers');
const database = require('../public/lib/database.json');

router.post('/links/auth',(req, res)=>{
    res.render('layouts/Usuarios');
});

//-----VARIABLES GLOBALES -----//
let alerta = "";
let textAlerta = "";
const Principal = '/Principal';
const usuarios = '/links/Usuarios';
const productos = '/links/Productos';
const Solicitudes = '/links/Solicitudes';


//Al realizar el llamado a la url validateuser se valida credenciales de inicio de sesión
router.post('/validateUser', async(req, res) =>{
    //Variable con los datos enviados desde el login
    const {email, password} = req.body;

    //Validamos que los datos no vengan vacios
    if (email.length || password.length !== 0) {

        //Realizamos consulta con las credenciales del usuario       
        for (i=0; i < database.length; i++){
            if (database[i].email == email){
                dataUser = database[i];
            }
        }      

        if (dataUser.passwordencrypted.length > 0) {
            var match = await helpers.matchPassword(password, dataUser.passwordencrypted);
            
            if(match == true){
                var nameUser = dataUser.name;
                if (typeof localStorage === "undefined" || localStorage === null) {
                    var LocalStorage = require('node-localstorage').LocalStorage;
                    localStorage = new LocalStorage('./scratch');
                  }
                if( dataUser.admin === 1){
                    localStorage.setItem('dataAdmin', nameUser);
                }
                localStorage.setItem('nameUser', JSON.stringify(dataUser));
                res.redirect('/perfil'); 
            }else{
                //Si no son correctas se envia alerta
                textAlerta = "Usuario o contraseña incorrecta";
                alerta = "alerta_visible";            
                //Redireccionamos a la url y enviamos mensaje de alerta y nombre de la clase css
                res.render('./layouts/login', {textAlerta, alerta});  
            }                                   

        }else{
                //Si no son correctas se envia alerta
                textAlerta = "El correo electrónico no se encuentra registrado";
                alerta = "alerta_visible";            
                //Redireccionamos a la url y enviamos mensaje de alerta y nombre de la clase css
                res.render('./layouts/login', {textAlerta, alerta});               
        }       
    } else {
        //Si las variables son vacias se direcciona a la pantalla de login
        var textalerta = "Los datos son obligatorios";
        var alerta = "alerta_visible";
        //Redireccionamos a la url y enviamos mensaje de alerta y nombre de la clase css
        res.render('./layouts/login', {textalerta, alerta});        
    }

});


module.exports = router;
