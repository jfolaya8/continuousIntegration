
let editUser = function (idUsuario){

    let identificacion = document.getElementById( 'usuIden' + idUsuario ).textContent,
        nombreUser = document.getElementById( 'usuNombre' + idUsuario ).textContent,
        rolUser = document.getElementById( 'usuRol' + idUsuario ).attributes[1].nodeValue,
        cargoUser = document.getElementById( 'usuCargo' + idUsuario ).textContent,
        correoUser = document.getElementById( 'usuCorreo' + idUsuario ).textContent;
    

    document.getElementById( 'idUser' ).value = idUsuario;
    document.getElementById( 'ccUser' ).value = identificacion;
    document.getElementById( 'nombreUser' ).value = nombreUser;
    document.getElementById( 'listRol' ).value = rolUser;
    document.getElementById( 'cargoUser' ).value = cargoUser;
    document.getElementById( 'correoUser' ).value = correoUser;


    $('#editarusuario').modal('show');        
}

let actualizarDatos = async function(){
    document.getElementById('nombre').disabled = false;
    document.getElementById('apellido').disabled = false;
    document.getElementById('numdoc').disabled = false;
    document.getElementById('celular').disabled = false;
    document.getElementById('direccion').disabled = false;
    await document.getElementById('button-perfil').removeAttribute('onclick');
    $("#form-data-user").attr("action", '/updataDataUser');
    $("#form-data-user").attr("method", 'POST');
    $("#button-perfil").attr("style", 'display: none;');
    $("#button-cancelar").attr("style", 'display: block;');
    $("#button-guardar").attr("style", 'display: block;');
    
}


function alertaUser(){
    let numdoc = document.getElementById('numdoc').value;
    let celular = document.getElementById('celular').value;
    let direccion = document.getElementById('direccion').value;
    if (numdoc == "" || celular == "" || direccion == "") {
        $("#alerta").attr("style", 'display: block;');
        document.getElementById('alerta').innerHTML = "¡Vaya! Parece que tienes información sin diligenciar..";
    }
}