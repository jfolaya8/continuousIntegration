const express = require('express');
const expres = require('express');
const router = expres.Router();
const path = require('path');

const productos = require('../public/lib/productos.json');
const helpers = require('../public/lib/helpers');

router.get('', async(req, res) => {
    res.render('layouts/index');
})

router.get('/index', async(req, res) => {
    let nameUser  = helpers.localStorage('nameUser');
    if(helpers.localStorage('nameUser')){
        nameUser = JSON.parse(nameUser);
        nameUser = nameUser.name;  
    }
    res.render('layouts/index', {nameUser});
})

//Al realizar un llamado a la url /Login se redireccionara a la pantalla index.hbs
router.get('/productos', async (req, res)=>{
    let nameUser  = helpers.localStorage('nameUser');
    nameUser = JSON.parse(nameUser);
    nameUser = nameUser.name;  
    res.render('layouts/productos', {nameUser, productos});
    
});

router.get('/about', async(req, res)=>{
    let nameUser  = helpers.localStorage('nameUser');
    nameUser = JSON.parse(nameUser);
    nameUser = nameUser.name;    
    res.render('layouts/about', {nameUser});

});

router.get('/contactenos', (req, res)=>{
    let nameUser  = helpers.localStorage('nameUser');
    nameUser = JSON.parse(nameUser);
    nameUser = nameUser.name;    
    res.render('layouts/contactenos', {nameUser});
});

router.get('/perfil', (req, res) =>{
    let nameUser  = helpers.localStorage('nameUser');
    let admin = helpers.localStorage('dataAdmin');
    nameUser = JSON.parse(nameUser);
    nameUser = nameUser.name;  
    res.render('layouts/perfil', {nameUser, admin});
})


router.get('/registro', (req, res)=>{
    res.render('layouts/registro');
});

router.get('/login', (req, res)=>{
    res.render('layouts/login');
});

router.get('/closeSession', (req, res)=>{
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }
    localStorage.clear();
    res.redirect('index');
});

router.get('/misdatos', async (req, res)=>{
    let datauser = helpers.localStorage('nameUser');
    let nameUser = helpers.localStorage('nameUser');
    let admin = helpers.localStorage('dataAdmin');
    nameUser = JSON.parse(nameUser);
    nameUser = nameUser.name;  
    datauser = JSON.parse(datauser);
    res.render('layouts/misdatos', {nameUser, admin, datauser});
});

router.get('/admproducto', async (req, res)=>{
    let nameUser  = helpers.localStorage('nameUser');
    let admin = helpers.localStorage('dataAdmin');
    nameUser = JSON.parse(nameUser);
    nameUser = nameUser.name;   
    const productos = await db.query(`select idProducto, nombreProducto, unidades,  precioUnitario, descripcion   from producto`);
    res.render('layouts/admproducto', {nameUser, admin, productos});

});

router.get('/pedidos', (req, res)=>{
    let nameUser  = helpers.localStorage('nameUser');
    let admin = helpers.localStorage('dataAdmin');
    nameUser = JSON.parse(nameUser);
    nameUser = nameUser.name;   
    res.render('layouts/pedidos', {nameUser, admin});
});

router.get('/banner', (req, res)=>{
    let nameUser  = helpers.localStorage('nameUser');
    let admin = helpers.localStorage('dataAdmin');
    nameUser = JSON.parse(nameUser);
    nameUser = nameUser.name;    
    res.render('layouts/banner', {nameUser, admin});
});

router.get('/form-add', (req, res)=>{
    let nameUser  = helpers.localStorage('nameUser');
    let admin = helpers.localStorage('dataAdmin');
    nameUser = JSON.parse(nameUser);
    nameUser = nameUser.name;    
    res.render('layouts/form-add', {nameUser, admin});
});

router.get('/checkout', (req, res)=>{
    let nameUser  = helpers.localStorage('nameUser');
    if(helpers.localStorage('nameUser')){
        nameUser = JSON.parse(nameUser);
        nameUser = nameUser.name;  
    }
    res.render('layouts/checkout', {nameUser});
});

router.get('/prepare-checkout/:id', (req, res)=>{
    if(helpers.localStorage('carCheckout')){
        let productos = helpers.localStorage('carCheckout');
        console.log(req.params.id);
    }else{

        localStorage.setItem('carCheckout', nameUser);
    }
});



module.exports = router;