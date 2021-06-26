const express = require('express');
const router = express.Router();

const passport = require('passport')

//const db = require('../database');
const helpers = require('../public/lib/helpers');

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
        const savedPassword = await db.query(`SELECT * FROM cliente WHERE correo = '${email}'`);      

        if (savedPassword.length > 0) {
            let savedPass = savedPassword[0].contrasena;
            var match = await helpers.matchPassword(password, savedPass);
            
            if(match == true){
                var nameUser = savedPassword[0].nombres;
                if (typeof localStorage === "undefined" || localStorage === null) {
                    var LocalStorage = require('node-localstorage').LocalStorage;
                    localStorage = new LocalStorage('./scratch');
                  }
                if( savedPassword[0].admin === 1){
                    localStorage.setItem('dataAdmin', nameUser);
                }
                localStorage.setItem('nameUser', JSON.stringify(savedPassword));
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
